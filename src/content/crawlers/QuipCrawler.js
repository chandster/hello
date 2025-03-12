import { CrawledDocument } from './CrawledDocument.js';

// Returns the list of domains that this crawler should process
export class QuipCrawler {
  getApplicableDomains() {
    // Return an array of domain names that this crawler should process
    return ['quip-amazon'];
  }

  process(url, document) {
    // Get all visible text from the page
    const allWords = document.body.innerText;
    // Normalize the text by replacing line breaks with spaces
    const normalizedWords = allWords.replace(/(\r\n|\n|\r)/gm, ' ');
    // Remove any URL fragments from the URL
    const index = url.lastIndexOf('#');
    let normalizedUrl = url;
    if (index !== -1) {
      normalizedUrl = url.substring(0, index);
    }
    // Create a new CrawledDocument object with the normalized URL, normalized text, and document title
    return new CrawledDocument(normalizedUrl, normalizedWords, document.title);
  }

  // Checks if this crawler should handle a given URL
  isCompatible(url) {
    const domainURL = (new URL(url)); // Get the domain of the URL
    const domain = domainURL.hostname.toLocaleLowerCase();
    let isMatch = false;
    const compatibleDomains = this.getApplicableDomains();

    // Check if the domain matches any of the compatible domains
    for (let i = 0; i < compatibleDomains.length; i++) {
      if (domain.indexOf(compatibleDomains[i]) !== -1) {
        isMatch = true;
      }
    }
    return isMatch;
  }
}
