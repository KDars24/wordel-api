const fs = require('fs');
const { WORDS_FILE } = require('../config');

class WordModel {
  constructor() {
    this.wordsCache = null;
  }

  getWords() {
    if (this.wordsCache) {
      return this.wordsCache;
    }

    try {
      const fileContent = fs.readFileSync(WORDS_FILE, 'utf8');
      this.wordsCache = fileContent
        .split('\n')
        .map(word => word.trim().toLowerCase())
        .filter(word => word.length > 0);
      return this.wordsCache;
    } catch (error) {
      console.error('Error reading words file:', error);
      return [];
    }
  }

  wordExists(word) {
    const words = this.getWords();
    return words.includes(word.toLowerCase());
  }
}

module.exports = new WordModel();
