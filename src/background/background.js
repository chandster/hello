/* eslint-disable */
import MiniSearch from "minisearch";
 
export const LOCAL_INDEX_ID = "localSearchIndex";
 

 
const createIndex = (existingIndex)=> {
  let stopWords = ['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now']
 
  const indexDescriptor = {
    fields: ['title', 'allText'],
    storeFields: ['title'],
    idField: 'id',
    processTerm: (term, _fieldName) =>
      stopWords.includes(term) ? null : term.toLowerCase(),
    searchOptions: {
      processTerm: (term) => term.toLowerCase()
    }
  };
  let indexer = undefined;
  if(existingIndex === undefined){
    indexer = new MiniSearch(indexDescriptor);
  }else{
    indexer = MiniSearch.loadJSON(existingIndex,indexDescriptor);
  }
  return indexer;
}
const getStoredIndex = (cb)=>{
  chrome.storage.local.get(LOCAL_INDEX_ID, (data)=>{cb(data[LOCAL_INDEX_ID])});
}
 
const storeIndex = (indexData) => {
  const data = {
    [LOCAL_INDEX_ID]: indexData
  }
  chrome.storage.local.set(data, function() {
    console.log('Index data saved['+data.length+']');
  });
}
 
const getIndex = ()=> {
  if(!chrome.indexer){
    initialiseIndexer();
  }
  return chrome.indexer;
}
const replaceIndexerData = () => {
 
 
}
const addToIndex = (document)=> {
  let idx = getIndex();
  if(idx){
    console.time("Indexing Doc:" + document.id);
    if(idx.has(document.id)){
      idx.replace(document);
      console.log("Replacing doc in the index");
    }else{
      idx.add(document);
      console.log("Adding new doc in the index");
    }
    console.timeEnd("Indexing Doc:" + document.id);
    console.time("Storing the whole Index");
    let data = JSON.stringify(idx);
    storeIndex(data);
    console.timeEnd("Storing the whole Index");
  }
}
 
const search = (document, options) => {
  let idx = getIndex();
  return idx.search(document);
}
const sendResults = (searchQuery, sendResponse)=>{
  let searchResults =  search(searchQuery, null);
  let suggestions = [];
  for(let i=0;i<searchResults.length && i<5;i++){
    suggestions.push({content:searchResults[i].id,description:removeSpecialCharacters(searchResults[i].title)});
    console.log({content:searchResults[i].id,description:searchResults[i].title});
  }
  console.log("numbers of suggestions:" + suggestions.length);
  sendResponse(suggestions);
}
 
const indexingListener = (request, sender, sendResponse) => {
    // First, validate the message's structure.
 
    if ((request.from === 'popup') && (request.subject === 'indexerData')) {
      // Enable the page-action for the requesting tab.
      sendResponse(chrome.storedIndex);
    }else if ((request.from === 'popup') && (request.subject === 'setIndexerData')){
      let isSuccessful = replaceIndexerData(request.content);
    }else{
      addToIndex(request.document);
      sendResponse("OK:Indexed");
    }
   
}
 
const initialiseIndexer = ()=> {
  const initialiseIndexerAsync =(indexerData) => {
    if(indexerData && indexerData.length > 0){
      chrome.storedIndex = indexerData;
    }
    chrome.indexer  = createIndex(chrome.storedIndex);
  }
  getStoredIndex(initialiseIndexerAsync);
}
 
initialiseIndexer();
chrome.runtime.onMessage.addListener(indexingListener);
 
chrome.omnibox.onInputChanged.addListener((text,suggest) => {
  sendResults(text,suggest);
});
 
chrome.omnibox.onInputEntered.addListener((text, OnInputEnteredDisposition) => {
  chrome.tabs.update({url:text});
});
 
const removeSpecialCharacters = (stringToBeSanitized)=>{
  let specialChars = "!@#$^&%*+=[]\/{}|:<>?,.";
  for (let i = 0; i < specialChars.length; i++) {
    stringToBeSanitized = stringToBeSanitized.replace(new RegExp("\\" + specialChars[i], "gi"), "");
  }
  return stringToBeSanitized;
}