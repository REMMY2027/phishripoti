const OpenAI = require('openai');
const QuizScore = require('../models/QuizScore');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const generateQuiz = async (req, res) => {
  try {
    const { module, department, isPost, learningContent } = req.body;

    const learningContext = isPost && learningContent
      ? `
The student just completed the following learning content. Base your post-assessment questions DIRECTLY on this material:

KEY POINTS TAUGHT:
${(learningContent.keyPoints || []).map((p, i) => `${i + 1}. ${typeof p === 'string' ? p : p.title + ': ' + p.detail}`).join('\n')}

SCENARIOS COVERED:
${(learningContent.scenarios || []).map((s, i) => `${i + 1}. ${s.title}: ${s.description}`).join('\n')}

KEY TAKEAWAYS:
${(learningContent.keyTakeaways || []).join('\n')}

Generate questions that test understanding of the above content specifically.`
      : '';

    const prompt = `You are a cybersecurity awareness trainer specialising in phishing threats targeting Kenyan financial institutions.

You are generating a ${isPost ? 'POST' : 'PRE'}-assessment quiz for an employee working in the ${department} department at a Kenyan bank.

CRITICAL INSTRUCTION: Every single question MUST be tailored specifically to the ${department} department. Do NOT generate generic cybersecurity questions. Every question must reference realistic scenarios, job tasks, tools, emails, or communication patterns that are specific to someone working in ${department} at a Kenyan bank such as KCB, Equity Bank, Co-operative Bank, ABSA Kenya, Stanbic Bank, or Standard Chartered Kenya.

Module: ${module}
${isPost ? 'These must be DIFFERENT questions from the pre-assessment and must test understanding of the learning content provided below.' : 'These are baseline questions to assess the current awareness level of a ' + department + ' employee.'}
${learningContext}

Generate exactly 5 multiple choice questions. Each question must:
1. Be directly relevant to a ${department} employee — reference tasks, emails, or situations that someone in ${department} would actually encounter at a Kenyan bank
2. Include Kenyan financial institution context — name specific institutions such as KCB, Equity Bank, Safaricom, M-Pesa, CBK, KRA, or use realistic Kenyan email domains
3. Have exactly 4 answer options
4. Have one correct answer identified by correctIndex (0, 1, 2, or 3)
5. Be relevant to the module: ${module}

For at least 2 questions, create a realistic phishing email mockup using Kenyan context that a ${department} employee would plausibly receive. Include an emailMockup object for those questions only.

Return ONLY valid JSON with no extra text, no markdown, no backticks:
{
  "questions": [
    {
      "question": "question text here",
      "options": ["option A", "option B", "option C", "option D"],
      "correctIndex": 0,
      "explanation": "Clear explanation of why this answer is correct and what a ${department} employee should do",
      "emailMockup": {
        "from": "sender@suspicious-domain.com",
        "to": "staff@kcbbank.co.ke",
        "subject": "URGENT: Subject line",
        "body": "2-3 sentence realistic phishing email body targeting a ${department} employee.",
        "link": "http://suspicious-link.net/verify"
      }
    }
  ]
}

Rules:
- Only include emailMockup for email scenario questions
- correctIndex must be 0, 1, 2, or 3
- Every question must clearly relate to the ${department} department role
- Use realistic Kenyan bank domain names in mockups
- Make explanations educational and specific to the ${department} role in Kenyan finance`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      max_tokens: 2000
    });

    const data = JSON.parse(response.choices[0].message.content);
    res.json(data);
  } catch (error) {
    console.error('Generate quiz error:', error);
    res.status(500).json({ message: 'Error generating quiz questions.' });
  }
};

const generateContent = async (req, res) => {
  try {
    const { module, department } = req.body;

    const prompt = `You are a cybersecurity awareness trainer specialising in phishing threats targeting Kenyan financial institutions.

You are generating learning content specifically for an employee in the ${department} department at a Kenyan bank.

CRITICAL INSTRUCTION: All content must be tailored specifically to the ${department} department. Do NOT generate generic cybersecurity content. Every key point, scenario, and takeaway must reference realistic situations, responsibilities, and communication patterns that are specific to someone working in ${department} at a Kenyan bank such as KCB, Equity Bank, Co-operative Bank, ABSA Kenya, Stanbic Bank, or Standard Chartered Kenya.

Module: ${module}

Return ONLY valid JSON with no extra text, no markdown, no backticks:
{
  "keyPoints": [
    {
      "title": "Short title specific to ${department}",
      "detail": "2-3 sentence explanation of how this phishing threat applies specifically to someone working in ${department} at a Kenyan bank. Reference realistic ${department} tasks, tools, or communications."
    }
  ],
  "scenarios": [
    {
      "title": "Scenario title referencing ${department} role",
      "description": "2-3 sentence realistic phishing scenario targeting a ${department} employee at a Kenyan bank. Name specific institutions such as KCB, Equity Bank, M-Pesa, Safaricom, CBK, or KRA. Make the scenario something a ${department} employee would genuinely encounter.",
      "redFlag": "The specific red flag a ${department} employee should have spotted in this scenario"
    }
  ],
  "keyTakeaways": [
    "Takeaway specific to ${department} role at a Kenyan bank",
    "Takeaway specific to ${department} role at a Kenyan bank",
    "Takeaway specific to ${department} role at a Kenyan bank",
    "Takeaway specific to ${department} role at a Kenyan bank"
  ]
}

Rules:
- Include exactly 5 key points each with title and detail
- Include exactly 3 scenarios
- Include exactly 4 key takeaways
- Every single item must be specific to the ${department} department role
- Use realistic Kenyan financial sector context throughout
- Never use generic advice that could apply to any department`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      max_tokens: 2000
    });

    const data = JSON.parse(response.choices[0].message.content);
    res.json(data);
  } catch (error) {
    console.error('Generate content error:', error);
    res.status(500).json({ message: 'Error generating content.' });
  }
};

const saveScore = async (req, res) => {
  try {
    const { module, preScore, postScore } = req.body;
    const delta = postScore - preScore;
    const sessionId = require('crypto').randomBytes(16).toString('hex');
    const quizScore = new QuizScore({ sessionId, module, preScore, postScore, delta });
    await quizScore.save();
    res.json({ message: 'Score saved successfully', delta });
  } catch (error) {
    console.error('Save score error:', error);
    res.status(500).json({ message: 'Error saving score.' });
  }
};

const getAwarenessStats = async (req, res) => {
  try {
    const scores = await QuizScore.find();
    const totalSessions = scores.length;
    const avgDelta = totalSessions > 0
      ? (scores.reduce((sum, s) => sum + (s.delta || 0), 0) / totalSessions).toFixed(1)
      : 0;

    const byModule = {};
    scores.forEach(s => {
      if (!byModule[s.module]) {
        byModule[s.module] = { count: 0, totalDelta: 0 };
      }
      byModule[s.module].count++;
      byModule[s.module].totalDelta += s.delta || 0;
    });

    res.json({ totalSessions, avgDelta, byModule });
  } catch (error) {
    console.error('Awareness stats error:', error);
    res.status(500).json({ message: 'Error fetching awareness stats.' });
  }
};

module.exports = { generateQuiz, saveScore, getAwarenessStats, generateContent };