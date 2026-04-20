const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  tokenId: {
    type: String,
    required: true,
    unique: true
  },
  incidentType: {
    type: String,
    required: true,
    default: 'Phishing Email'
  },
  senderEmail: {
    type: String,
    required: true
  },
  subjectLine: {
    type: String,
    required: true
  },
  suspiciousLinks: [{
    url: String,
    safeBrowsingResult: {
      isMalicious: Boolean,
      threatType: String
    }
  }],
  emailDescription: {
    type: String,
    required: true
  },
  clickedAnything: {
    type: String,
    enum: ['no', 'link', 'attachment', 'both'],
    default: 'no'
  },
  riskLevel: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH'],
    required: true
  },
  riskScore: {
    type: Number,
    required: true
  },
  aiAnalysis: {
    reasons: [String],
    recommendedActions: [String],
    didYouKnow: String,
    domainSpoofing: Boolean,
    urgencyLanguage: Boolean,
    credentialHarvesting: Boolean,
    mpesaAbuse: Boolean
  },
  alertSent: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'under_review', 'resolved'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Report', reportSchema);