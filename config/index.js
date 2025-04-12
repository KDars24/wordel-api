const path = require('path');

module.exports = {
  PORT: process.env.PORT || 3000,
  WORDS_FILE: path.join(__dirname, '..', 'words.txt')
};