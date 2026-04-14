const Bot = require('../models/Bot');
const User = require('../models/User');
const whatsappMock = require('../utils/whatsappMock');

exports.listBots = async (req, res, next) => {
  try {
    const bots = await Bot.find({ user: req.user.id });
    res.json(bots);
  } catch (error) {
    next(error);
  }
};

exports.createBot = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const { name, accountSid, authToken, phoneNumber, webhookUrl } = req.body;

    if (!name || !accountSid || !authToken || !phoneNumber || !webhookUrl) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    if (user.credits <= 0) {
      return res.status(403).json({ message: 'Créditos insuficientes para activar un nuevo bot' });
    }

    const bot = await Bot.create({
      user: user._id,
      name,
      accountSid,
      authToken,
      phoneNumber,
      webhookUrl,
      isActive: true,
      status: 'online',
    });

    user.credits -= 1;
    await user.save();

    res.status(201).json(bot);
  } catch (error) {
    next(error);
  }
};

exports.updateBot = async (req, res, next) => {
  try {
    const bot = await Bot.findOne({ _id: req.params.id, user: req.user.id });
    if (!bot) return res.status(404).json({ message: 'Bot no encontrado' });

    const { name, accountSid, authToken, phoneNumber, webhookUrl, isActive } = req.body;
    bot.name = name || bot.name;
    bot.accountSid = accountSid || bot.accountSid;
    bot.authToken = authToken || bot.authToken;
    bot.phoneNumber = phoneNumber || bot.phoneNumber;
    bot.webhookUrl = webhookUrl || bot.webhookUrl;

    if (typeof isActive === 'boolean' && isActive !== bot.isActive) {
      const user = await User.findById(req.user.id);
      if (isActive && user.credits <= 0) {
        return res.status(403).json({ message: 'No hay créditos suficientes para activar el bot' });
      }
      if (isActive) {
        user.credits -= 1;
        bot.status = 'online';
      } else {
        user.credits += 1;
        bot.status = 'offline';
      }
      bot.isActive = isActive;
      await user.save();
    }

    await bot.save();
    res.json(bot);
  } catch (error) {
    next(error);
  }
};

exports.deleteBot = async (req, res, next) => {
  try {
    const bot = await Bot.findOne({ _id: req.params.id, user: req.user.id });
    if (!bot) return res.status(404).json({ message: 'Bot no encontrado' });

    if (bot.isActive) {
      const user = await User.findById(req.user.id);
      user.credits += 1;
      await user.save();
    }

    await bot.remove();
    res.json({ message: 'Bot eliminado' });
  } catch (error) {
    next(error);
  }
};

exports.sendMessage = async (req, res, next) => {
  try {
    const bot = await Bot.findOne({ _id: req.params.id, user: req.user.id });
    if (!bot) return res.status(404).json({ message: 'Bot no encontrado' });
    if (!bot.isActive) return res.status(400).json({ message: 'Bot está inactivo' });

    const { to, text } = req.body;
    const result = await whatsappMock.sendMessage({ bot, to, text });
    res.json(result);
  } catch (error) {
    next(error);
  }
};
