const express = require('express');
const router = express.Router();
const {
  submitReport,
  getReports,
  getReport,
  updateStatus,
  getDashboardStats,
  quickFill
} = require('../controllers/reportController');
const { authenticateITManager } = require('../middleware/auth');

router.post('/submit', submitReport);
router.post('/quick-fill', quickFill);
router.get('/', authenticateITManager, getReports);
router.get('/stats', authenticateITManager, getDashboardStats);
router.get('/:tokenId', authenticateITManager, getReport);
router.patch('/:tokenId/status', authenticateITManager, updateStatus);

module.exports = router;