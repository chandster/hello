import { CrawledDocument } from "./CrawledDocument";

export class GenericCrawler {


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

