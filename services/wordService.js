const wordModel = require('../models/wordModel');

class WordService {
  getWordOfTheDay() {
    const words = wordModel.getWords();
    if (words.length === 0) {
      return null;
    }

    // Get current date in YYYY-MM-DD format based on UTC
    const today = new Date();
    const dateString = `${today.getUTCFullYear()}-${String(today.getUTCMonth() + 1).padStart(2, '0')}-${String(today.getUTCDate()).padStart(2, '0')}`;
    
    // Use the date string to create a deterministic index
    let sum = 0;
    for (let i = 0; i < dateString.length; i++) {
      sum += dateString.charCodeAt(i);
    }
    
    const index = sum % words.length;
    return words[index];
  }

  wordExists(word) {
    return wordModel.wordExists(word);
  }

  getWordCount() {
    return wordModel.getWords().length;
  }
}

module.exports = new WordService();
