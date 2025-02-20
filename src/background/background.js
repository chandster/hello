import { BM25F } from '../../assets/js/wink-bm25-text-search.js';
import MiniSearch from '../../assets/js/minisearch.min.js';

let engine;
const winkNLP = require('wink-nlp');
const model = require('wink-eng-lite-web-model');

const nlp = winkNLP(model);
const { its } = nlp;
const _ = require('lodash');

const defaultRegexList = [
  '^https://[^/]+.amazon.com/.*$',
  '^https://atoz.amazon.work/.*$',
  '^https://quip-amazon.com/.*$',
  '^https://quip.com/.*$',
];

const TITLE_BOOST = 3;
const FREQUENT_WORD_BOOST = 2;
const MIN_SEARCH_TERM_LENGTH = 3;
const DEFAULT_WEIGHT = 0.2;
const BM25F_MIN_DOCS = 3;

let docs;
let runningEngine;

const prepTask = function prepTask(text) {
  const tokens = [];
  nlp
    .readDoc(text)
    .tokens()
    .filter((t) => t.out(its.type) === 'word' && !t.out(its.stopWordFlag))
    .each((t) => tokens.push(
      t.out(its.negationFlag) ? `!${t.out(its.stem)}` : t.out(its.stem),
    ));
  return tokens;
};

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


// update the documents used by miniSearch
function updateIndex(miniSearch, result) {
  miniSearch.addAll((result.indexed && result.indexed.corpus) ? result.indexed.corpus : []);
}

function initialiseMiniSearch() {
  const miniSearch = new MiniSearch({
    fields: ['title', 'body', 'frequentWords'],
    storeFields: ['url'],
  });
  return miniSearch;
}

const miniSearch = initialiseMiniSearch();

chrome.storage.local.get(['indexed']).then((result) => {
  updateIndex(miniSearch, result);
});



// gets the logical combinator (if present) to be passed into the MiniSearch search
function getLogicalCombinator(searchTerms) {
  const lastTerm = searchTerms[searchTerms.length - 1];
  let combinator;
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
  return combinator;
}

// returns results from a MiniSearch search
function search(miniSearchObj, text) {
  return miniSearchObj.search(text, {
    boost: { title: TITLE_BOOST, frequentWords: FREQUENT_WORD_BOOST },
    prefix: (term) => term.length > MIN_SEARCH_TERM_LENGTH,
    fuzzy: (term) => (term.length > MIN_SEARCH_TERM_LENGTH ? DEFAULT_WEIGHT : null),
  });
}

// returns results from a MiniSearch search with a provided logical combinator
function searchWithCombinator(miniSearchObj, text, combinator) {
  return miniSearchObj.search(text, {
    boost: { title: TITLE_BOOST, frequentWords: FREQUENT_WORD_BOOST },
    prefix: (term) => term.length > MIN_SEARCH_TERM_LENGTH,
    fuzzy: (term) => (term.length > MIN_SEARCH_TERM_LENGTH ? DEFAULT_WEIGHT : null),
    combineWith: combinator,
  });
}

// gets top search suggestions as an array of dictionaries
function getSuggestions(searchResults, numSuggestions, corpus) {
  const suggestions = [];
  for (let docID = 0; docID < numSuggestions; docID += 1) {
    if (docID === searchResults.length) break;
    const searchResult = searchResults[docID];
    const page = corpus[searchResult.id - 1];
    suggestions.push({
      content: page.url,
      description: page.title,
      deletable: true,
    });
  }
  return suggestions;
}

// search indexed pages (corpus) for text with BM25 and MiniSearch
// hoping to remove the dependency on BM25 and use MiniSearch only
function suggestFromIndex(text, corpus) {
  let suggestions = [];
  let searchResults = [];

  let searchTerms = text.split(' ');
  const combinator = getLogicalCombinator(searchTerms);

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
      searchResults = searchWithCombinator(miniSearch, text, combinator);
    } else {
      searchResults = search(miniSearch, text);
    }
    const MAX_SUGGESTIONS = 10;
    suggestions = getSuggestions(searchResults, MAX_SUGGESTIONS, corpus);
  }
  return suggestions;
}

function deleteTask(allTasks, taskIdToRemove) {
  const updatedTasks = Object.fromEntries(
    Object.entries(allTasks).filter(([taskId]) => taskId !== taskIdToRemove),
  );
  if (Object.keys(updatedTasks).length === 0) {
    allTasks = {};
  } else {
    allTasks = updatedTasks;
  }
  chrome.storage.local.set({ tasks: allTasks }, () => {});
}

// Listen for when the tab's url changes and send a message to popup.js
chrome.tabs.onUpdated.addListener((changeInfo) => {
  if (changeInfo.url) {
    chrome.runtime.sendMessage({ type: 'URL_UPDATED', url: changeInfo.url });
  }
});

// Listen for when the user changes tabs and send a message to popup.js
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab && tab.url) {
      chrome.runtime.sendMessage({ type: 'TAB_CHANGED', url: tab.url });
    }
  });
});

chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  chrome.storage.local.get(['indexed']).then((result) => {
    if (Object.keys(result).length > 0) {
      const { corpus } = result.indexed;
      if (corpus.length) {
        const suggestions = suggestFromIndex(text, corpus);
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
  const alarmName = alarm.name;
  if (alarmName.endsWith('_deletion_alarm')) {
    const taskId = alarmName.split('_')[0];
    chrome.storage.local.get({ tasks: {} }, (result) => {
      const existingTasks = result.tasks || {};
      deleteTask(existingTasks, taskId);
    });
  }
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

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === 'add-note') {
    alert('You clicked the custom menu item!');
  }
});



chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.storage.local.set({ allowedSites: [] }, () => {
    });

    chrome.storage.local.set({ allowedURLs: [] }, () => {});

    chrome.storage.local.set({ allowedStringMatches: [] }, () => {});

    chrome.storage.local.set({ allowedRegex: defaultRegexList }, () => {});

    chrome.storage.local.set({ allLastTitles: {} }, () => {});
  }
});

function createContextMenu() {
  chrome.contextMenus.create({
    id: 'addNote',
    title: 'Hawk - Add text to Notes',
    contexts: ['selection'],
  });
}

function setDueDate(daysToAdd) {
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + daysToAdd); // Add days based on the input
  return dueDate.toISOString();
}

function addNewNote(title, content, tags) {
  const noteId = Date.now().toString();
  const note = {
    id: noteId,
    title,
    content,
    due: setDueDate(7),
    scheduledDeletion: '',
    recentlyDeleted: false,
    tags,
  };
  chrome.storage.local.get({ notes: [] }, (data) => {
    const existingNotes = data.notes;

    existingNotes.push(note);

    chrome.storage.local.set({ notes: existingNotes }, () => {
    });
  });
}

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === 'addNote') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTitle = tabs[0].title;
      const selectedText = `${currentTitle} ${info.selectionText}`;
      const title = selectedText.length > 10 ? `${selectedText.substring(0, 15)}...` : selectedText;
      addNewNote(title, selectedText, {});
    });
  }
});

chrome.runtime.onInstalled.addListener(() => {
  createContextMenu();
});
