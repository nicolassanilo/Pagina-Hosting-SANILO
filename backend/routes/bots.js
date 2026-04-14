const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  listBots,
  createBot,
  updateBot,
  deleteBot,
  sendMessage,
} = require('../controllers/botController');

router.use(auth);
router.get('/', listBots);
router.post('/', createBot);
router.put('/:id', updateBot);
router.delete('/:id', deleteBot);
router.post('/:id/send', sendMessage);

module.exports = router;
