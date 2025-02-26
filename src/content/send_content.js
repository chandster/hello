class CrawledDocument {
  constructor(id, allText, title) {
      this.id = id;
      this.allText = allText;
      this.title = title;
  }

  getId() {
      return this.id;
  }
  
  getAllText() {
      return this.allText;
  }

  getTitle() {
      return this.title;
  }
}

class QuipCrawler {
    
     getApplicableDomains() {
        return ["quip-amazon","bbc"];    
    }

     process(url, document) {
        const allWords = document.body.innerText;
        const normalizedWords = allWords.replace(/(\r\n|\n|\r)/gm, " ");
        let index = url.lastIndexOf('#');
        let normalizedUrl = url;
        if(index !== -1){
            normalizedUrl = url.substring(0,index);
        }
        return new CrawledDocument(normalizedUrl, normalizedWords, document.title);
    }

     isCompatible(url){
        let domainURL = (new URL(url));
        let domain = domainURL.hostname.toLocaleLowerCase();
        let isMatch = false;
        let compatibleDomains = this.getApplicableDomains();
        for(let i = 0; i < compatibleDomains.length; i++){
            if(domain.indexOf(compatibleDomains[i]) !== -1){
                isMatch = true;
            }
        }
        return isMatch;
    } 
}

class GenericCrawler {


     getApplicableDomains() {
        return ["amazon","a2z"];
    }
     process(url, document) {
        const allWords = document.body.innerText;
        const normalizedWords = allWords.replace("\n"," ");
        return new CrawledDocument(url, normalizedWords, document.title);
    }

     isCompatible(url){
        let domainURL = (new URL(url));
        let domain = domainURL.hostname.toLocaleLowerCase();
        let isMatch = false;
        let compatibleDomains = this.getApplicableDomains();
        for(let i = 0; i < compatibleDomains.length; i++){
            if(domain.indexOf(compatibleDomains[i]) !== -1){
                isMatch = true;
            }
        }
        return isMatch;
    } 
}



console.log("CONTENT SCRIPT: Hello World");

const crawlers =[new QuipCrawler(), new GenericCrawler()];

const indexDocument = (doc )=>{
    console.log("sending.....");
    chrome.runtime.sendMessage({document: doc }, function(response) {
    });
}

const scrapePage = () => {
    if (document.readyState !== "complete") {
        return;
    }
    
    const url = window.location.href;
    for (const crawler of crawlers) {
        if(crawler.isCompatible(url)){
            let crawledDocument = crawler.process(url, document);
            indexDocument(crawledDocument);
            console.log("Document Crawled: "+ crawledDocument.getId());
            break;
        }
    }
}

setInterval(scrapePage,15000);
