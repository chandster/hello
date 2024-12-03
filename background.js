import { BM25F } from './assets/wink-bm25-text-search.js';
import MiniSearch from './assets/minisearch.min.js';

const xmlEscape = require('xml-escape');
const { Mutex } = require('async-mutex');

const indexMutex = new Mutex();

let engine;
const winkNLP = require('wink-nlp');
const model = require('wink-eng-lite-web-model');

const nlp = winkNLP(model);
const { its } = nlp;
const _ = require('lodash');

const { removeStopwords } = require('stopword');

const defaultRegexList = [
  '^https://[^/]+\.amazon\.com/.*$',
  '^https://atoz\.amazon\.work/.*$',
  '^https://quip-amazon\.com/.*$',
  '^https://quip\.com/.*$',
];

const TITLE_BOOST = 3;
const FREQUENT_WORD_BOOST = 2;
const MIN_SEARCH_TERM_LENGTH = 3;
const DEFAULT_WEIGHT = 0.2;
const BM25F_MIN_DOCS = 3;

const prepTask = function prepTask(text) {
  const tokens = [];
  nlp.readDoc(text)
    .tokens()
    .filter((t) => (t.out(its.type) === 'word' && !t.out(its.stopWordFlag)))
    .each((t) => tokens.push((t.out(its.negationFlag)) ? `!${t.out(its.stem)}` : t.out(its.stem)));
  return tokens;
};

let docs;
let runningEngine;

async function setupBM25F() {
  engine = new BM25F();

  await chrome.storage.local.get(['indexed']).then((result) => {
    if (result && result.indexed) {
      docs = result.indexed.corpus;
    }
  });

  engine.defineConfig({ fldWeights: { title: 20, body: 1 } });
  engine.definePrepTasks([prepTask]);
  if (docs && docs.length) {
    docs.forEach((doc, i) => {
      engine.addDoc(doc, i + 1);
    });
    if (docs.length >= BM25F_MIN_DOCS) {
      runningEngine = _.cloneDeep(engine);
      runningEngine.consolidate();
    }
  }
}

setupBM25F();

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

const miniSearch = new MiniSearch({
  fields: ['title', 'body', 'frequentWords'],
  storeFields: ['url'],
});

chrome.storage.local.get(['indexed']).then((result) => {
  miniSearch.addAll((result.indexed && result.indexed.corpus) ? result.indexed.corpus : []);
});

const MAX_TAB_REFRESH_ATTEMPTS = 20;
const TAB_REFRESH_DELAY_MS = 50;

chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  chrome.storage.local.get(['indexed']).then((result) => {
    if (Object.keys(result).length > 0) {
      const { corpus } = result.indexed;
      if (corpus.length) {
        const suggestions = [];
        let searchResults = [];

        let combinator;
        let searchTerms = text.split(' ');
        const lastTerm = searchTerms[searchTerms.length - 1];
        switch (lastTerm) {
          case '&':
            combinator = 'AND';
            break;
          case '~':
            combinator = 'AND_NOT';
            break;
          default:
            combinator = null;
            break;
        }

        if (combinator && searchTerms.length) {
          searchTerms = searchTerms.slice(0, searchTerms.length - 1);
          text = searchTerms.join(' ');
        }

        if (corpus.length >= MIN_SEARCH_TERM_LENGTH && !combinator) {
          searchResults = runningEngine.search(text);
          for (let docID = 0; docID < 10; docID += 1) {
            if (docID === searchResults.length) break;
            const page = corpus[searchResults[docID][0] - 1];
            suggestions.push({
              content: page.url,
              description: page.title,
              deletable: true,
            });
          }
        }

        if (!suggestions.length) {
          if (combinator) {
            searchResults = miniSearch.search(text, {
              boost: { title: TITLE_BOOST, frequentWords: FREQUENT_WORD_BOOST },
              prefix: (term) => term.length > MIN_SEARCH_TERM_LENGTH,
              fuzzy: (term) => (term.length > MIN_SEARCH_TERM_LENGTH ? DEFAULT_WEIGHT : null),
              combineWith: combinator,
            });
          } else {
            searchResults = miniSearch.search(text, {
              boost: { title: TITLE_BOOST, frequentWords: FREQUENT_WORD_BOOST },
              prefix: (term) => term.length > MIN_SEARCH_TERM_LENGTH,
              fuzzy: (term) => (term.length > MIN_SEARCH_TERM_LENGTH ? DEFAULT_WEIGHT : null),
            });
          }
          for (let docID = 0; docID < 10; docID += 1) {
            if (docID === searchResults.length) break;
            const searchResult = searchResults[docID];
            const page = corpus[searchResult.id - 1];
            suggestions.push({
              content: page.url,
              description: page.title,
              deletable: true,
            });
          }
        }

        suggest(suggestions);
      }
    }
  });
});

chrome.omnibox.onInputEntered.addListener((text) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs && tabs[0]) {
      const tabId = tabs[0].id;
      chrome.tabs.update(tabId, { url: text });
    } else {
      chrome.tabs.create({ url: text });
    }
  });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  chrome.storage.local.get('tasks').then((result) => {
    const existingTasks = result || {};
    const foundTask = existingTasks.tasks[alarm.name];
    if (Object.keys(existingTasks).length !== 0 && foundTask && !foundTask.recentlyDeleted) {
      const notification = {
        type: 'basic',
        iconUrl: chrome.runtime.getURL('../images/logo128x128.png'),
        title: `Your task ${foundTask.title} is due`,
        message: foundTask.description,
      };
      chrome.notifications.create(alarm.name, notification);
    }
  });
});

function deleteTask(allTasks, taskIdToRemove) {
  const updatedTasks = Object.fromEntries(
    Object.entries(allTasks).filter(([taskId]) => taskId !== taskIdToRemove),
  );
  if (Object.keys(updatedTasks).length === 0) {
    allTasks = {};
  } else {
    allTasks = updatedTasks;
  }
  chrome.storage.local.set({ tasks: allTasks }, () => {
  });
}

chrome.alarms.onAlarm.addListener((alarm) => {
  const alarmName = alarm.name;
  if (alarmName.endsWith('_deletion_alarm')) {
    const taskId = alarmName.split('_')[0];
    chrome.storage.local.get({ tasks: {} }, (result) => {
      const existingTasks = result.tasks || {};
      deleteTask(existingTasks, taskId);
    });
  }
});

function removeAnchorLink(url) {
  return url.split('#')[0];
}

async function getLocalStorage(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result);
      }
    });
  });
}

async function waitForTitleUpdate(title, lastTitles) {
  for (let i = 0; i < MAX_TAB_REFRESH_ATTEMPTS; i += 1) {
    await new Promise((resolve) => {
      setTimeout(resolve, TAB_REFRESH_DELAY_MS);
    });

    const tabs = await new Promise((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (allTabs) => {
        resolve(allTabs);
      });
    });
    if (!(tabs && tabs.length)) return '';

    title = tabs[0].title;
    if (!lastTitles.has(title)) break;

    if (i === MAX_TAB_REFRESH_ATTEMPTS - 1) return '';
  }

  return title;
}

chrome.runtime.onMessage.addListener(async (request) => {
  if (request.action === 'sendVisibleTextContent' || request.action === 'pageNavigated') {
    const releaseIndexing = await indexMutex.acquire();
    try {
      const url = removeAnchorLink(request.url);

      const tabs = await new Promise((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (allTabs) => {
          resolve(allTabs);
        });
      });
      if (!(tabs && tabs.length)) return;

      const tabId = tabs[0].id;

      let title;
      if (request.clicked) {
        title = tabs[0].title;
      } else {
        title = request.title;
      }
      if (!title) return;

      const allLastTitles = await new Promise((resolve) => {
        chrome.storage.local.get(['allLastTitles'], (result) => {
          resolve(result.allLastTitles);
        });
      });
      let lastTitles = allLastTitles[tabId];
      lastTitles = new Set(lastTitles);

      const indexedResult = await getLocalStorage('indexed');
      const indexed = indexedResult.indexed || {};
      if (Object.keys(indexed).length === 0) {
        indexed.corpus = [];
        indexed.links = new Set();
      }
      // chrome storage serialising and deserialising loses set type
      indexed.links = new Set(indexed.links);

      if (indexed.links.has(url)) return;

      if (lastTitles.has(title) || request.clicked) {
        lastTitles.add(title);
        title = await waitForTitleUpdate(title, lastTitles);
        if (title === '') return;
      }
      lastTitles.add(title);
      lastTitles = Array.from(lastTitles);
      allLastTitles[tabId] = lastTitles;
      await chrome.storage.local.set({ allLastTitles });

      const page = {
        id: indexed.corpus.length + 1,
        url,
        title: xmlEscape(title),
        body: request.visibleTextContent,
        frequentWords: [],
      };

      let decodedURL = decodeURIComponent(page.url);
      if (decodedURL.includes('?')) {
        [decodedURL, queryString] = decodedURL.split('?');
      }
      if (`https://www.${page.title}` === decodedURL) {
        return;
      } if (`https://${page.title}` === decodedURL) {
        return;
      }

      let oldBody = page.body.split(/\n|\s/);
      oldBody = removeStopwords(oldBody).join(' ');

      const newBody = getPageBody(oldBody);

      const numTopWords = 10; // define the length of mostFrequentWords
      const mostFrequentWords = getWordSlice(newBody, numTopWords);

      page.body = newBody;
      page.frequentWords = mostFrequentWords; // use mostFrequentWords array in miniSearch
      indexed.corpus.push(page);
      indexed.links.add(url);

      miniSearch.add(page);

      engine.addDoc(page, String(page.id));
      runningEngine = _.cloneDeep(engine);
      if (Object.keys(runningEngine.getDocs()).length >= BM25F_MIN_DOCS) {
        runningEngine.consolidate();
      }

      // must convert to an array to avoid values being lost when
      // the set is converted to an Object during serialisation
      indexed.links = Array.from(indexed.links);
      await chrome.storage.local.set({ indexed });
    } finally {
      releaseIndexing();
    }
  } else if (request.action === 'updateIndexing') {
    miniSearch.removeAll();
    chrome.storage.local.get(['indexed']).then((result) => {
      miniSearch.addAll((result.indexed && result.indexed.corpus) ? result.indexed.corpus : []);
    });
    setupBM25F();
  }
});

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.storage.local.set({ allowedSites: [] }, () => {
    });

    chrome.storage.local.set({ allowedURLs: [] }, () => {
    });

    chrome.storage.local.set({ allowedStringMatches: [] }, () => {
    });

    chrome.storage.local.set({ allowedRegex: defaultRegexList }, () => {
    });

    chrome.storage.local.set({ allLastTitles: {} }, () => {
    });
  }
});
