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

    const prompt = `You are a cybersecurity trainer for Kenyan financial institutions.

Generate exactly 5 multiple choice questions for a ${isPost ? 'POST' : 'PRE'}-assessment quiz.
Module: ${module}
Department: ${department}
${isPost ? 'These must be DIFFERENT questions from the pre-assessment.' : 'These are baseline questions to assess current awareness level.'}
${learningContext}

IMPORTANT: For at least 2 questions, create a realistic phishing email scenario using Kenyan context (KCB, Equity Bank, Safaricom, M-Pesa, CBK, KRA). For these questions include an emailMockup object.

Return ONLY valid JSON:
{
  "questions": [
    {
      "question": "question text",
      "options": ["option A", "option B", "option C", "option D"],
      "correctIndex": 0,
      "explanation": "Clear explanation of why this is correct",
      "emailMockup": {
        "from": "sender@suspicious-domain.com",
        "to": "staff@kcbbank.co.ke",
        "subject": "URGENT: Subject line",
        "body": "2-3 sentence realistic phishing email body.",
        "link": "http://suspicious-link.net/verify"
      }
    }
  ]
}

Rules:
- Only include emailMockup for email scenario questions
- correctIndex must be 0, 1, 2, or 3
- Use realistic Kenyan domain names in mockups
- Make explanations educational and specific to Kenyan finance`;

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

    const prompt = `You are a cybersecurity trainer for Kenyan financial institutions.

Generate detailed learning content for:
Module: ${module}
Department: ${department}

Return ONLY valid JSON:
{
  "keyPoints": [
    {
      "title": "Short title of the point",
      "detail": "2-3 sentence detailed explanation specific to ${department} in Kenyan financial sector"
    }
  ],
  "scenarios": [
    {
      "title": "Scenario title",
      "description": "2-3 sentence realistic scenario using Kenyan context - KCB, Equity Bank, M-Pesa, Safaricom, CBK etc",
      "redFlag": "The key insight or lesson from this scenario"
    }
  ],
  "keyTakeaways": ["takeaway 1", "takeaway 2", "takeaway 3", "takeaway 4"]
}

Rules:
- Include exactly 5 key points each with title and detail
- Include exactly 3 scenarios
- Include exactly 4 key takeaways
- Use realistic Kenyan financial sector context
- Make content specific to ${department} role`;

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
    const quizScore = new QuizScore({ module, preScore, postScore, delta });
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