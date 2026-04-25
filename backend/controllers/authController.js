const ITManager = require('../models/ITManager');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Store OTPs temporarily in memory (keyed by email)
const otpStore = {};

// Generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP email via SendGrid
const sendOTPEmail = async (email, otp, name) => {
  await sgMail.send({
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: 'PhishRipoti — Your Login Verification Code',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; background: #0a0d0a; padding: 40px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <div style="display: inline-flex; align-items: center; gap: 8px;">
            <div style="width: 36px; height: 36px; background: #BB0000; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
              <span style="color: white; font-weight: bold; font-size: 18px;">P</span>
            </div>
            <span style="color: white; font-weight: bold; font-size: 20px;">PhishRipoti</span>
          </div>
        </div>

        <h2 style="color: #ffffff; font-size: 20px; margin-bottom: 8px; text-align: center;">
          Login Verification Code
        </h2>
        <p style="color: rgba(255,255,255,0.5); font-size: 14px; text-align: center; margin-bottom: 32px;">
          Hello ${name}, use the code below to complete your sign in.
        </p>

        <div style="background: rgba(187,0,0,0.1); border: 1px solid rgba(187,0,0,0.3); border-radius: 12px; padding: 28px; text-align: center; margin-bottom: 24px;">
          <div style="font-size: 42px; font-weight: 900; letter-spacing: 12px; color: #ffffff; font-family: monospace;">
            ${otp}
          </div>
          <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin-top: 12px; margin-bottom: 0;">
            This code expires in <strong style="color: #BB0000;">10 minutes</strong>
          </p>
        </div>

        <p style="color: rgba(255,255,255,0.3); font-size: 12px; text-align: center; line-height: 1.6;">
          If you did not attempt to log in, please ignore this email.<br/>
          Never share this code with anyone.
        </p>

        <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.06); text-align: center;">
          <p style="color: rgba(255,255,255,0.2); font-size: 11px;">
            PhishRipoti — Kenyan Financial Institutions Threat Intelligence
          </p>
        </div>
      </div>
    `,
  });
};

// STEP 1 — Verify credentials, send OTP
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const manager = await ITManager.findOne({ email });
    if (!manager) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await manager.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Store OTP
    otpStore[email] = { otp, expiresAt, managerId: manager._id.toString() };

    // Send OTP email
    await sendOTPEmail(email, otp, manager.name);

    res.json({
      message: 'Verification code sent to your email.',
      email: email,
      requiresOTP: true,
    });

  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Login failed. Please try again.' });
  }
};

// STEP 2 — Verify OTP, issue JWT
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = otpStore[email];

    if (!record) {
      return res.status(400).json({ message: 'No verification code found. Please log in again.' });
    }

    if (Date.now() > record.expiresAt) {
      delete otpStore[email];
      return res.status(400).json({ message: 'Verification code has expired. Please log in again.' });
    }

    if (record.otp !== otp.trim()) {
      return res.status(400).json({ message: 'Incorrect verification code. Please try again.' });
    }

    // OTP valid — clean up
    delete otpStore[email];

    const manager = await ITManager.findById(record.managerId);
    if (!manager) {
      return res.status(404).json({ message: 'Manager not found.' });
    }

    manager.lastLogin = new Date();
    await manager.save();

    const token = jwt.sign(
      {
        id: manager._id,
        email: manager.email,
        name: manager.name,
        institution: manager.institution,
      },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      token,
      manager: {
        email: manager.email,
        name: manager.name,
        institution: manager.institution,
      },
    });

  } catch (error) {
    console.error('OTP verify error:', error.message);
    res.status(500).json({ message: 'Verification failed. Please try again.' });
  }
};

// Resend OTP
const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const manager = await ITManager.findOne({ email });
    if (!manager) {
      return res.status(404).json({ message: 'Manager not found.' });
    }

    const otp = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000;
    otpStore[email] = { otp, expiresAt, managerId: manager._id.toString() };

    await sendOTPEmail(email, otp, manager.name);

    res.json({ message: 'New verification code sent.' });

  } catch (error) {
    console.error('Resend OTP error:', error.message);
    res.status(500).json({ message: 'Failed to resend code.' });
  }
};

const register = async (req, res) => {
  try {
    const { email, password, name, institution } = req.body;

    const existing = await ITManager.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'An account with this email already exists.' });
    }

    const manager = new ITManager({ email, password, name, institution });
    await manager.save();

    res.status(201).json({ message: 'IT Manager account created successfully.' });

  } catch (error) {
    console.error('Register error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const manager = await ITManager.findById(req.manager.id).select('-password');
    if (!manager) {
      return res.status(404).json({ message: 'Manager not found.' });
    }
    res.json(manager);
  } catch (error) {
    console.error('Profile error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login, verifyOTP, resendOTP, getProfile };