const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const reportRoutes = require('./routes/reports');
const authRoutes = require('./routes/auth');
const awarenessRoutes = require('./routes/awareness');

const app = express();

// CORS
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
    'https://phishripoti.netlify.app',
    'https://beamish-speculoos-57f10a.netlify.app'
  ],
  credentials: true
}));

// Body parser
app.use(express.json({ limit: '10mb' }));

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.'
});

// Apply rate limiter to specific routes only
app.use('/api/reports', limiter);
app.use('/api/auth', limiter);
app.use('/api/awareness', limiter);

// Routes
app.use('/api/reports', reportRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/awareness', awarenessRoutes);

// Health check - not rate limited
app.get('/api/health', (req, res) => {
  res.json({ status: 'PhishRipoti backend running' });
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(process.env.PORT || 5001, () => {
      console.log(`PhishRipoti backend running on port ${process.env.PORT || 5001}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });