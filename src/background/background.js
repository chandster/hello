import MiniSearch from 'minisearch';

/**
 * Constants
 * --------------------------
 * LOCAL_INDEX_ID: Key for storing the search index in Chrome's local storage
 */
export const LOCAL_INDEX_ID = 'localSearchIndex';

/**
 * Debug Utilities
 * --------------
 * Functions for debugging and development.
 */
function exportStorageToFile() {
  console.log('Starting export...');
  chrome.storage.local.get(LOCAL_INDEX_ID, (data) => {
    console.log('Retrieved data:', data);
    const jsonString = JSON.stringify(data, null, 2);
    const dataUrl = `data:application/json;base64,${btoa(unescape(encodeURIComponent(jsonString)))}`;

    chrome.downloads.download({
      url: dataUrl,
      filename: 'hawk_index_backup.json',
      saveAs: true,
    }, (downloadId) => {
      console.log('Download started with ID:', downloadId);
    });
  });
}

// Make export function available globally
globalThis.exportIndex = exportStorageToFile;

// Also add to chrome object for service worker context
chrome.exportIndex = exportStorageToFile;

/**
 * Search Index Management
 * ----------------------
 * Handles creating, loading, and maintaining the search index.
 */
const createIndex = (existingIndex) => {
  const stopWords = ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now'];

  const indexDescriptor = {
    fields: ['title', 'allText'],
    storeFields: ['title'],
    idField: 'id',
    processTerm: (term, _fieldName) => (stopWords.includes(term) ? null : term.toLowerCase()),
    searchOptions: {
      processTerm: (term) => term.toLowerCase(),
    },
  };
  let indexer;
  if (existingIndex === undefined) {
    indexer = new MiniSearch(indexDescriptor);
  } else {
    indexer = MiniSearch.loadJSON(existingIndex, indexDescriptor);
  }
  return indexer;
};

/**
 * Storage Interface
 * ----------------
 * Manages reading/writing the index from Chrome's local storage.
 */
const getStoredIndex = (cb) => {
  chrome.storage.local.get(LOCAL_INDEX_ID, (data) => { cb(data[LOCAL_INDEX_ID]); });
};

const storeIndex = (indexData) => {
  const data = {
    [LOCAL_INDEX_ID]: indexData,
  };
  chrome.storage.local.set(data, () => {
    console.log(`Index data saved[${data.length}]`);
  });
};

/**
 * Index Access and Manipulation
 * ---------------------------
 * Functions for retrieving, adding, and updating indexed documents.
 */
const getIndex = () => {
  if (!chrome.indexer) {
    initialiseIndexer();
  }
  return chrome.indexer;
};

/**
 * TODO: Implement this function to replace the indexer data
 */
const replaceIndexerData = () => {

};

const addToIndex = (document) => {
  const idx = getIndex();
  if (idx) {
    console.time(`Indexing Doc:${document.id}`);
    if (idx.has(document.id)) {
      idx.replace(document);
      console.log('Replacing doc in the index');
    } else {
      idx.add(document);
      console.log('Adding new doc in the index');
    }
    console.timeEnd(`Indexing Doc:${document.id}`);
    console.time('Storing the whole Index');
    const data = JSON.stringify(idx);
    storeIndex(data);
    console.timeEnd('Storing the whole Index');
  }
};

/**
 * Search and Results Processing
 * ---------------------------
 * Handles querying the index and formatting results.
 */
const search = (document, options) => {
  const idx = getIndex();
  return idx.search(document);
};

const sendResults = (searchQuery, sendResponse) => {
  const searchResults = search(searchQuery, null);
  const suggestions = [];
  for (let i = 0; i < searchResults.length && i < 5; i++) {
    suggestions.push({ content: searchResults[i].id, description: removeSpecialCharacters(searchResults[i].title) });
    console.log({ content: searchResults[i].id, description: searchResults[i].title });
  }
  console.log(`numbers of suggestions:${suggestions.length}`);
  sendResponse(suggestions);
};

/**
 * Message Handling
 * ---------------
 * Processes messages from content scripts and the popup.
 */
const indexingListener = (request, sender, sendResponse) => {
  if ((request.from === 'popup') && (request.subject === 'indexerData')) {
    sendResponse(chrome.storedIndex);
  } else if ((request.from === 'popup') && (request.subject === 'setIndexerData')) {
    const isSuccessful = replaceIndexerData(request.content);
  } else if (request.action === 'exportIndex') {
    exportStorageToFile();
    sendResponse({ status: 'exporting' });
  } else {
    addToIndex(request.document);
    sendResponse('OK:Indexed');
  }
};

/**
 * Initialization
 * -------------
 * Sets up the extension and search indexer.
 */
const initialiseIndexer = () => {
  const initialiseIndexerAsync = (indexerData) => {
    if (indexerData && indexerData.length > 0) {
      chrome.storedIndex = indexerData;
    }
    chrome.indexer = createIndex(chrome.storedIndex);
  };
  getStoredIndex(initialiseIndexerAsync);
};

/**
 * Utility Functions
 * ----------------
 */
const removeSpecialCharacters = (stringToBeSanitized) => {
  const specialChars = '!@#$^&%*+=[]/{}|:<>?,.';
  let sanitizedString = stringToBeSanitized; // ✅ Create a new variable
  for (let i = 0; i < specialChars.length; i++) {
    sanitizedString = sanitizedString.replace(new RegExp(`\\${specialChars[i]}`, 'gi'), '');
  }
  return sanitizedString;
};

// Initialize extension and set up listeners
initialiseIndexer();
chrome.runtime.onMessage.addListener(indexingListener);

chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  sendResults(text, suggest);
});

chrome.omnibox.onInputEntered.addListener((text, OnInputEnteredDisposition) => {
  chrome.tabs.update({ url: text });
});

function deleteTask(allTasks, taskIdToRemove) {
  const updatedTasks = Object.fromEntries(
    Object.entries(allTasks).filter(([taskId]) => taskId !== taskIdToRemove),
  );

  const finalTasks = Object.keys(updatedTasks).length === 0 ? {} : updatedTasks; // ✅ Create new variable

  chrome.storage.local.set({ tasks: finalTasks }, () => {});
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

function createContextMenu() {
  chrome.contextMenus.create({
    id: 'addNote',
    title: 'Hawk 2 - Add text to Notes',
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

// Listen for when the tab's url changes and send a message to popup.js
/* eslint-disable no-unused-vars */
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    chrome.runtime.sendMessage({ type: 'URL_UPDATED', url: changeInfo.url });
  }
});
/* eslint-enable no-unused-vars */

// Listen for when the user changes tabs and send a message to popup.js
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab && tab.url) {
      chrome.runtime.sendMessage({ type: 'TAB_CHANGED', url: tab.url });
    }
  });
});

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

chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(console.error);
});
