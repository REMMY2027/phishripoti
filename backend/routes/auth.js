const express = require('express');
const router = express.Router();
const { register, login, verifyOTP, resendOTP, getProfile } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);
router.get('/profile', authMiddleware, getProfile);

module.exports = router;