const wordService = require('../services/wordService');
const gameService = require('../services/gameService');

class GameController {
  makeGuess(req, res) {
    const { guess } = req.body;
    
    if (!guess || typeof guess !== 'string') {
      return res.status(400).json({ error: 'Invalid guess. Please provide a valid word.' });
    }
    
    // Check if the guessed word exists in the word list
    if (!wordService.wordExists(guess)) {
      return res.status(400).json({ error: 'No such word exists in the word list.' });
    }
    
    const wordOfTheDay = wordService.getWordOfTheDay();
    
    if (!wordOfTheDay) {
      return res.status(500).json({ error: 'Could not retrieve word of the day.' });
    }
    
    const result = gameService.evaluateGuess(guess, wordOfTheDay);
    const isCorrect = guess.toLowerCase() === wordOfTheDay;
    
    if (!result) {
      return res.status(400).json({ 
        error: `Invalid guess. Word must be ${wordOfTheDay.length} letters long.` 
      });
    }
    
    return res.json({
      guess,
      result,
      correct: isCorrect,
      message: isCorrect ? 'Congratulations! You guessed the word correctly!' : 'Try again!'
    });
  }

  getStatus(req, res) {
    const wordOfTheDay = wordService.getWordOfTheDay();
    
    if (!wordOfTheDay) {
      return res.status(500).json({ error: 'Could not retrieve word of the day.' });
    }
    
    res.json({
      date: new Date().toISOString().split('T')[0],
      wordLength: wordOfTheDay.length,
      status: 'active'
    });
  }
}

module.exports = new GameController();