const express = require('express');
const router = express.Router();
const { register, login, verifyOTP, resendOTP, getProfile } = require('../controllers/authController');
const { authenticateITManager } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);
router.get('/profile', authenticateITManager, getProfile);

module.exports = router;