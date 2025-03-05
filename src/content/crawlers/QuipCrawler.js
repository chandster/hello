 import { CrawledDocument } from "./CrawledDocument";

// Returns the list of domains that this crawler should process
export class QuipCrawler {
    
     getApplicableDomains() {
        // Return an array of domain names that this crawler should process
        return ["quip-amazon","bbc"];    
    }

     process(url, document) {
        // Get all visible text from the page
        const allWords = document.body.innerText;
        // Normalize the text by replacing line breaks with spaces
        const normalizedWords = allWords.replace(/(\r\n|\n|\r)/gm, " ");
        // Remove any URL fragments from the URL
        let index = url.lastIndexOf('#');
        let normalizedUrl = url;
        if(index !== -1){
            normalizedUrl = url.substring(0,index);
        }
        // Create a new CrawledDocument object with the normalized URL, normalized text, and document title
        return new CrawledDocument(normalizedUrl, normalizedWords, document.title);
    }

    // Checks if this crawler should handle a given URL
     isCompatible(url){
       
        let domainURL = (new URL(url));  // Get the domain of the URL
        let domain = domainURL.hostname.toLocaleLowerCase();b 
        let isMatch = false; 
        let compatibleDomains = this.getApplicableDomains();
        
        // Check if the domain matches any of the compatible domains
        for(let i = 0; i < compatibleDomains.length; i++){
            if(domain.indexOf(compatibleDomains[i]) !== -1){
                isMatch = true;
            }
        }
        return isMatch;
    } 
}