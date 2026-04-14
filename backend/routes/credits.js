const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getCredits, addCredits } = require('../controllers/creditController');

router.use(auth);
router.get('/', getCredits);
router.post('/add', addCredits);

module.exports = router;
