const QuizScore = require('../models/QuizScore');
const OpenAI = require('openai');
const { v4: uuidv4 } = require('uuid');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const generateQuiz = async (req, res) => {
  try {
    const { module, department, isPost, instruction } = req.body;

    const prompt = `You are a cybersecurity trainer specialising in phishing awareness for Kenyan financial institutions.

Generate 5 multiple choice quiz questions about "${module}" tailored for a ${department} employee at a Kenyan financial institution.

${instruction || ''}

Each question must be based on real phishing tactics used in Kenya, including M-Pesa fraud, KCB, Equity Bank, and Safaricom impersonation where relevant.

Return ONLY this JSON structure, no other text:
{
  "questions": [
    {
      "id": 1,
      "question": "<realistic scenario-based question>",
      "options": ["<option A>", "<option B>", "<option C>", "<option D>"],
      "correctIndex": <0-3>,
      "explanation": "<why this answer is correct and what to watch out for>"
    }
  ]
}

Rules:
- Each question must present a realistic phishing scenario
- Questions must be relevant to ${department} employees specifically
- Include at least one M-Pesa or mobile money scenario
- Correct answers should always be the safe, security-conscious choice
- Explanations must be educational and specific to Kenyan financial sector threats`;

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

Generate educational learning content about "${module}" for a ${department} employee.

Return ONLY this JSON structure:
{
  "introduction": "<2-3 sentence introduction to the topic specific to ${department} employees in Kenya>",
  "scenarios": [
    {
      "title": "<scenario title>",
      "description": "<realistic scenario description using Kenyan context - KCB, Equity Bank, M-Pesa, Safaricom etc>",
      "redFlag": "<specific red flag to watch out for>"
    }
  ],
  "keyTakeaways": ["<takeaway 1>", "<takeaway 2>", "<takeaway 3>", "<takeaway 4>"]
}

Rules:
- Include exactly 3 scenarios
- Include exactly 4 key takeaways
- Use realistic Kenyan financial sector context
- Make content specific to ${department} role`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      max_tokens: 1500
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

    const sessionId = uuidv4();

    const quizScore = new QuizScore({
      sessionId,
      module,
      preScore,
      postScore,
      delta: postScore - preScore
    });

    await quizScore.save();

    res.status(201).json({
      message: 'Score saved anonymously.',
      sessionId,
      delta: quizScore.delta
    });

  } catch (error) {
    console.error('Save score error:', error);
    res.status(500).json({ message: 'Error saving score.' });
  }
};

const getAwarenessStats = async (req, res) => {
  try {
    const scores = await QuizScore.find().select('-__v');

    const totalSessions = scores.length;
    const avgDelta = totalSessions > 0
      ? (scores.reduce((sum, s) => sum + (s.delta || 0), 0) / totalSessions).toFixed(2)
      : 0;

    const byModule = {};
    scores.forEach(s => {
      if (!byModule[s.module]) {
        byModule[s.module] = { count: 0, totalDelta: 0 };
      }
      byModule[s.module].count++;
      byModule[s.module].totalDelta += s.delta || 0;
    });

    res.json({
      totalSessions,
      avgDelta,
      byModule
    });

  } catch (error) {
    console.error('Awareness stats error:', error);
    res.status(500).json({ message: 'Error fetching awareness stats.' });
  }
};

module.exports = { generateQuiz, saveScore, getAwarenessStats, generateContent };