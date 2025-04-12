const app = require('./app');
const { PORT } = require('./config');
const wordService = require('./services/wordService');

app.listen(PORT, () => {
  console.log(`Wordle API server running on port ${PORT}`);
  // Preload words for faster responses
  const wordCount = wordService.getWordCount();
  console.log(`Loaded ${wordCount} words from dictionary`);
});