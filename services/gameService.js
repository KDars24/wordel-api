class GameService {
    evaluateGuess(guess, solution) {
      // Validate input
      if (!guess || !solution || guess.length !== solution.length) {
        return null;
      }
  
      guess = guess.toLowerCase();
      solution = solution.toLowerCase();
      
      let result = '';
      let solutionChars = solution.split('');
      
      // First pass: find exact matches
      for (let i = 0; i < guess.length; i++) {
        if (guess[i] === solution[i]) {
          result += 'o';
          solutionChars[i] = null; // Mark as used
        } else {
          result += '_'; // Placeholder for second pass
        }
      }
      
      // Second pass: find misplaced letters
      for (let i = 0; i < guess.length; i++) {
        if (result[i] === '_') {
          const charIndex = solutionChars.indexOf(guess[i]);
          if (charIndex !== -1) {
            result = result.substring(0, i) + '.' + result.substring(i + 1);
            solutionChars[charIndex] = null; // Mark as used
          } else {
            result = result.substring(0, i) + 'x' + result.substring(i + 1);
          }
        }
      }
      
      return result;
    }
  }
  
  module.exports = new GameService();