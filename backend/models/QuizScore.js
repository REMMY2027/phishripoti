const mongoose = require('mongoose');

const quizScoreSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true
  },
  module: {
    type: String,
    required: true,
    enum: [
      'Spotting Phishing Emails',
      'M-Pesa and Mobile Money Phishing',
      'Business Email Compromise'
    ]
  },
  preScore: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  postScore: {
    type: Number,
    min: 0,
    max: 5
  },
  delta: {
    type: Number
  },
  completedAt: {
    type: Date,
    default: Date.now
  }
});

// Auto calculate delta before saving
quizScoreSchema.pre('save', function(next) {
  if (this.preScore !== undefined && this.postScore !== undefined) {
    this.delta = this.postScore - this.preScore;
  }
  next();
});

module.exports = mongoose.model('QuizScore', quizScoreSchema);