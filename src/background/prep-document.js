// This file handles the pre-processing and addition of web documents to the Hawk index.

const { removeStopwords } = require('stopword');

// currently used to check suitability of a word to be stored in frequentWords
// potential to be used elsewhere
function wordIsAcceptable(word) {
  // can add and remove stopwords here as necessary
  const stopWords = ['to', 'of', 'we', 'in', 'it', 'if', 'be', 'myself', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves',
    'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves',
    'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'been', 'being',
    'have', 'has', 'had', 'having', 'does', 'did', 'doing', 'the', 'and', 'but', 'because', 'until',
    'while', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below',
    'from', 'down', 'out', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there',
    'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'nor', 'not', 'only',
    'own', 'same', 'than', 'too', 'very', 'can', 'will', 'just', 'don', 'should', 'now', 'dont', 'says'];
  const acceptableWordLength = 2;

  // reject if in stopWords
  // reject if less than the acceptable length
  if (stopWords.includes(word) || word.length < acceptableWordLength) {
    return false;
  }
  // reject if it is a number
  // unless the number looks like it *might* be a year
  // since user might want to search for a document from a particular year
  // we need to consider other numbers that may be useful search terms
  const isNumeric = (string) => Number.isFinite(+string);
  if (isNumeric(word)) {
    if (word.length === 4 && (word[0] === '1' || word[0] === '2')) {
      return true;
    }
    return false;
  }
  return true;
}

function getPageBody(body) {
  let pageBody = body.toLowerCase(); // convert the body into lower case

  // ignore all punctuation in the page body before splitting into an array of words
  const punctuationPattern = /[^\w\s]|_/g;
  pageBody = pageBody.replace(punctuationPattern, '');
  const bodyArr = pageBody.split(' ');
  // define a map to store words and their frequencies in bodyArr
  const wordCountMap = new Map();

  // update occurrences of every word in the page body, except unacceptable words
  bodyArr.forEach((wordInBody) => {
    const word = wordInBody.trim();
    if (wordIsAcceptable(word)) {
      wordCountMap.set(word, (wordCountMap.get(word) || 0) + 1);
    }
  });

  // map entries are sorted in order of most frequently occurring words
  const bodyWordsArray = Array.from(wordCountMap).sort((word, nextWord) => nextWord[1] - word[1]).map(([word]) => word);
  return bodyWordsArray.join(' ');
}

// function to return a top slice of words from a string of words
// array returned will contain AT MOST numStrings many words
function getWordSlice(text, numStrings) {
  const wordArray = text.split(' ');
  const topSlice = wordArray.slice(0, numStrings);
  return topSlice;
}

function removeAnchorLink(url) {
  return url.split('#')[0];
}

function removeQuery(url) {
  if (url.includes('?')) {
    const splitUrl = url.split('?');
    [url, queryString] = splitUrl;
  }
  return url;
}

function stripUrl(url) {
  const strippedUrl = removeQuery(removeAnchorLink(url));
  return strippedUrl;
}

function addPageToIndex(page, indexed, miniSearch) {
  let oldBody = page.body.split(/\n|\s/);
  oldBody = removeStopwords(oldBody).join(' ');

  const newBody = getPageBody(oldBody);

  const numTopWords = 10; // define the length of mostFrequentWords
  const mostFrequentWords = getWordSlice(newBody, numTopWords);

  page.body = newBody;
  page.frequentWords = mostFrequentWords; // use mostFrequentWords array in miniSearch
  indexed.corpus.push(page);

  miniSearch.add(page);
  return indexed;
}

function addUrlToIndex(url, indexed) {
  indexed.links.add(url);
  return indexed;
}

module.exports = {
  wordIsAcceptable, getPageBody, getWordSlice, stripUrl, addPageToIndex, addUrlToIndex,
};
