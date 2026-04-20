const mongoose = require('mongoose');
const ITManager = require('../models/ITManager');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  try {
    const { email, password, name, institution } = req.body;

    console.log('Registering:', email);
    console.log('ITManager model:', typeof ITManager);
    console.log('ITManager.findOne:', typeof ITManager.findOne);

    const existing = await ITManager.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'An account with this email already exists.' });
    }

    const manager = new ITManager({
      email,
      password,
      name,
      institution
    });

    await manager.save();

    res.status(201).json({ message: 'IT Manager account created successfully.' });

  } catch (error) {
    console.error('Register error FULL:', error.message);
    res.status(500).json({ message: error.message });
  }
};

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

    manager.lastLogin = new Date();
    await manager.save();

    const token = jwt.sign(
      {
        id: manager._id,
        email: manager.email,
        name: manager.name,
        institution: manager.institution
      },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      token,
      manager: {
        email: manager.email,
        name: manager.name,
        institution: manager.institution
      }
    });

  } catch (error) {
    console.error('Login error:', error.message);
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

module.exports = { register, login, getProfile };