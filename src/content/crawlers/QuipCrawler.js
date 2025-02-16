import { CrawledDocument } from "./CrawledDocument";
import { Crawler } from "./Crawler";

export class QuipCrawler {
    

    
     getApplicableDomains() {
        return ["quip-amazon"];    
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