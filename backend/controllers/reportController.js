const Report = require('../models/Report');
const OpenAI = require('openai');
const axios = require('axios');
const sgMail = require('@sendgrid/mail');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Google Safe Browsing check
const checkUrlSafety = async (urls) => {
  try {
    const response = await axios.post(
      `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${process.env.GOOGLE_SAFE_BROWSING_API_KEY}`,
      {
        client: { clientId: 'phishripoti', clientVersion: '1.0.0' },
        threatInfo: {
          threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING', 'UNWANTED_SOFTWARE', 'POTENTIALLY_HARMFUL_APPLICATION'],
          platformTypes: ['ANY_PLATFORM'],
          threatEntryTypes: ['URL'],
          threatEntries: urls.map(url => ({ url }))
        }
      }
    );

    const matches = response.data.matches || [];
    return urls.map(url => ({
      url,
      isMalicious: matches.some(m => m.threat.url === url),
      threatType: matches.find(m => m.threat.url === url)?.threatType || 'NONE'
    }));
  } catch (error) {
    console.error('Safe Browsing error:', error);
    return urls.map(url => ({ url, isMalicious: false, threatType: 'UNKNOWN' }));
  }
};

// GPT-4o analysis
const analyseWithGPT = async (emailData, department, safeBrowsingResults) => {
  const maliciousLinks = safeBrowsingResults.filter(r => r.isMalicious);

  const prompt = `You are a cybersecurity analyst specialising in phishing detection for Kenyan financial institutions.

Analyse this suspicious email report and return a JSON response only.

EMAIL DATA:
- Sender: ${emailData.senderEmail}
- Subject: ${emailData.subjectLine}
- Description: ${emailData.emailDescription}
- Links submitted: ${emailData.suspiciousLinks.join(', ')}
- Clicked anything: ${emailData.clickedAnything}
- Reporter department: ${department}
- Google Safe Browsing flagged links: ${maliciousLinks.map(l => l.url).join(', ') || 'None'}

INSTRUCTIONS:
1. Strip any PII (names, phone numbers, account numbers, personal emails) from your analysis
2. Evaluate for: domain spoofing, urgency fabrication, authority impersonation, credential harvesting, M-Pesa abuse
3. Consider Safe Browsing results at 30% weight and content analysis at 70% weight
4. Generate a department-specific Did You Know tip for ${department} employees
5. Return ONLY this JSON structure, no other text:

{
  "riskScore": <number 0-100>,
  "riskLevel": "<LOW|MEDIUM|HIGH>",
  "reasons": ["<reason1>", "<reason2>", "<reason3>"],
  "recommendedActions": ["<action1>", "<action2>", "<action3>"],
  "didYouKnow": "<educational tip specific to ${department} and this attack type>",
  "domainSpoofing": <true|false>,
  "urgencyLanguage": <true|false>,
  "credentialHarvesting": <true|false>,
  "mpesaAbuse": <true|false>,
  "sanitisedSender": "<sender with PII removed>",
  "sanitisedDescription": "<description with PII removed>"
}

Risk scoring rules:
- LOW: 0-39 (weak signals, likely safe)
- MEDIUM: 40-74 (suspicious, caution needed)  
- HIGH: 75-100 (strong phishing indicators detected)`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
    max_tokens: 1000
  });

  return JSON.parse(response.choices[0].message.content);
};

// Send HIGH risk alert via SendGrid
const sendHighRiskAlert = async (report, analysis) => {
  const msg = {
    to: process.env.IT_MANAGER_EMAIL,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: `HIGH RISK ALERT — PhishRipoti Token ${report.tokenId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #BB0000; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">HIGH RISK PHISHING ALERT</h1>
          <p style="color: #ffcccc; margin: 5px 0 0;">PhishRipoti Automated Alert System</p>
        </div>
        <div style="padding: 24px; background: #f9f9f9;">
          <p><strong>Token ID:</strong> ${report.tokenId}</p>
          <p><strong>Risk Score:</strong> ${report.riskScore}%</p>
          <p><strong>Sender Domain:</strong> ${report.senderEmail}</p>
          <p><strong>Subject:</strong> ${report.subjectLine}</p>
          <p><strong>Threat Indicators:</strong></p>
          <ul>
            ${analysis.reasons.map(r => `<li>${r}</li>`).join('')}
          </ul>
          <p><strong>Suspicious Links:</strong></p>
          <ul>
            ${report.suspiciousLinks.map(l => `<li>${l.url} — ${l.safeBrowsingResult.isMalicious ? 'FLAGGED by Google Safe Browsing' : 'Not flagged'}</li>`).join('')}
          </ul>
          <div style="background: #006600; color: white; padding: 12px; border-radius: 6px; margin-top: 16px;">
            <strong>Reporter identity: ZERO identifiers transmitted. Fully anonymous report.</strong>
          </div>
        </div>
      </div>
    `
  };

  await sgMail.send(msg);
};

// Submit report
const submitReport = async (req, res) => {
  console.log('Submit report called with body:', req.body);
  try {
    const {
      senderEmail,
      subjectLine,
      suspiciousLinks,
      emailDescription,
      clickedAnything,
      department
    } = req.body;

    // Extract URLs
    const urls = suspiciousLinks
      ? suspiciousLinks.split('\n').map(u => u.trim()).filter(u => u.length > 0)
      : [];

    // Run Safe Browsing and GPT-4o in parallel
    const [safeBrowsingResults, gptAnalysis] = await Promise.all([
      urls.length > 0 ? checkUrlSafety(urls) : Promise.resolve([]),
      analyseWithGPT(
        { senderEmail, subjectLine, suspiciousLinks: urls, emailDescription, clickedAnything },
        department || 'General',
        []
      )
    ]);

    // Generate anonymous token
    const rawToken = uuidv4();
    const tokenHash = await bcrypt.hash(rawToken, 10);
    const tokenId = 'RPT-' + rawToken.substring(0, 4).toUpperCase() + '-' +
                    rawToken.substring(4, 8).toUpperCase() + '-' +
                    rawToken.substring(9, 13).toUpperCase();

    // Build report — department stripped
    const report = new Report({
      tokenId,
      incidentType: 'Phishing Email',
      senderEmail: gptAnalysis.sanitisedSender || senderEmail,
      subjectLine,
      suspiciousLinks: safeBrowsingResults.map(r => ({
        url: r.url,
        safeBrowsingResult: {
          isMalicious: r.isMalicious,
          threatType: r.threatType
        }
      })),
      emailDescription: gptAnalysis.sanitisedDescription || emailDescription,
      clickedAnything,
      riskLevel: gptAnalysis.riskLevel,
      riskScore: gptAnalysis.riskScore,
      aiAnalysis: {
        reasons: gptAnalysis.reasons,
        recommendedActions: gptAnalysis.recommendedActions,
        didYouKnow: gptAnalysis.didYouKnow,
        domainSpoofing: gptAnalysis.domainSpoofing,
        urgencyLanguage: gptAnalysis.urgencyLanguage,
        credentialHarvesting: gptAnalysis.credentialHarvesting,
        mpesaAbuse: gptAnalysis.mpesaAbuse
      },
      alertSent: false,
      status: 'pending'
    });

    await report.save();

    // Send HIGH risk alert
    if (gptAnalysis.riskLevel === 'HIGH') {
      try {
        await sendHighRiskAlert(report, gptAnalysis);
        report.alertSent = true;
        await report.save();
      } catch (emailError) {
        console.error('SendGrid error:', emailError);
      }
    }

    res.status(201).json({
      tokenId,
      riskLevel: gptAnalysis.riskLevel,
      riskScore: gptAnalysis.riskScore,
      reasons: gptAnalysis.reasons,
      recommendedActions: gptAnalysis.recommendedActions,
      didYouKnow: gptAnalysis.didYouKnow,
      aiAnalysis: gptAnalysis,
      safeBrowsingResults,
      alertSent: report.alertSent
    });

  } catch (error) {
    console.error('Submit report error:', error);
    res.status(500).json({ message: 'Error processing report. Please try again.' });
  }
};

// Get all reports (IT Manager only)
const getReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .select('-__v')
      .sort({ createdAt: -1 });

    res.json(reports);
  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({ message: 'Error fetching reports.' });
  }
};

// Get single report
const getReport = async (req, res) => {
  try {
    const report = await Report.findOne({ tokenId: req.params.tokenId });
    if (!report) {
      return res.status(404).json({ message: 'Report not found.' });
    }
    res.json(report);
  } catch (error) {
    console.error('Get report error:', error);
    res.status(500).json({ message: 'Error fetching report.' });
  }
};

// Update report status
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const report = await Report.findOneAndUpdate(
      { tokenId: req.params.tokenId },
      { status },
      { new: true }
    );
    if (!report) {
      return res.status(404).json({ message: 'Report not found.' });
    }
    res.json(report);
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ message: 'Error updating report.' });
  }
};

// Dashboard stats
const getDashboardStats = async (req, res) => {
  try {
    const total = await Report.countDocuments();
    const high = await Report.countDocuments({ riskLevel: 'HIGH' });
    const medium = await Report.countDocuments({ riskLevel: 'MEDIUM' });
    const low = await Report.countDocuments({ riskLevel: 'LOW' });
    const alertsSent = await Report.countDocuments({ alertSent: true });

    const recentReports = await Report.find()
      .select('tokenId riskLevel riskScore status alertSent createdAt')
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      total,
      high,
      medium,
      low,
      alertsSent,
      recentReports
    });
  } catch (error) {
    console.error('Submit report error FULL:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({ message: error.message });
  }
};

const quickFill = async (req, res) => {
  try {
    const { rawEmail, department } = req.body;

    const prompt = `You are a cybersecurity analyst. Extract details from this raw email and return ONLY a JSON object.

Raw email:
${rawEmail}

Return ONLY this JSON:
{
  "senderEmail": "<extracted sender email>",
  "subjectLine": "<extracted subject line>",
  "suspiciousLinks": "<extracted URLs separated by newlines>",
  "emailDescription": "<what the email asks recipient to do, with all PII removed>"
}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      max_tokens: 500
    });

    const data = JSON.parse(response.choices[0].message.content);
    res.json(data);

  } catch (error) {
    console.error('Quick fill error:', error);
    res.status(500).json({ message: 'Error extracting email details.' });
  }
};

module.exports = {
  submitReport,
  getReports,
  getReport,
  updateStatus,
  getDashboardStats,
  quickFill
};