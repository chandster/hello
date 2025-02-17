const PrepareDocument = require('../src/background/prep-document');

// an example test suite for the wordIsAcceptable function
// in ../src/background/prep-document.js
describe('wordIsAcceptable', () => {
  it('should return false when the word is "it"', () => {
    const result = PrepareDocument.wordIsAcceptable('it');
    expect(result).toBe(false);
  });

  it('should return false when the word is "383.75"', () => {
    const result = PrepareDocument.wordIsAcceptable('383.75');
    expect(result).toBe(false);
  });

  it('should return true when the word is "2002"', () => {
    const result = PrepareDocument.wordIsAcceptable('2002');
    expect(result).toBe(true);
  });
});
