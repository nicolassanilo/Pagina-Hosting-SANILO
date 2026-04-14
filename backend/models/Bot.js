const mongoose = require('mongoose');

const botSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  provider: { type: String, default: 'whatsapp' },
  accountSid: { type: String },
  authToken: { type: String },
  phoneNumber: { type: String },
  webhookUrl: { type: String },
  isActive: { type: Boolean, default: false },
  status: { type: String, enum: ['online', 'offline'], default: 'offline' },
  lastMessage: { type: String, default: '' },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Bot', botSchema);
