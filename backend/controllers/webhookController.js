const Bot = require('../models/Bot');
const whatsappMock = require('../utils/whatsappMock');

exports.receiveWebhook = async (req, res, next) => {
  try {
    const { phoneNumber, message, from } = req.body;
    const bot = await Bot.findOne({ phoneNumber });
    if (!bot) return res.status(404).json({ message: 'Bot no encontrado para este número' });

    const response = whatsappMock.processIncomingMessage({ bot, message, from });
    res.json({ received: true, reply: response });
  } catch (error) {
    next(error);
  }
};
