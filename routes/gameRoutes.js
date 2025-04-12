const express = require('express');
const gameController = require('../controllers/gameController');

const router = express.Router();

router.post('/guess', gameController.makeGuess);
router.get('/status', gameController.getStatus);

module.exports = router;
