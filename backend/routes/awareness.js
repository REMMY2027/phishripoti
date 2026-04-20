const express = require('express');
const router = express.Router();
const {
  generateQuiz,
  saveScore,
  getAwarenessStats,
  generateContent
} = require('../controllers/awarenessController');
const { authenticateITManager } = require('../middleware/auth');

router.post('/generate-quiz', generateQuiz);
router.post('/generate-content', generateContent);
router.post('/save-score', saveScore);
router.get('/stats', authenticateITManager, getAwarenessStats);

module.exports = router;