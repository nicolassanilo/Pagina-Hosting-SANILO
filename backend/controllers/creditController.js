const User = require('../models/User');

exports.getCredits = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('credits');
    res.json({ credits: user.credits });
  } catch (error) {
    next(error);
  }
};

exports.addCredits = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const user = await User.findById(req.user.id);
    const add = Number(amount) || 1;
    user.credits += add;
    await user.save();
    res.json({ credits: user.credits, message: `Se agregaron ${add} créditos` });
  } catch (error) {
    next(error);
  }
};
