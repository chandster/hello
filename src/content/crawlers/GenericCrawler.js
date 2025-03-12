import { CrawledDocument } from './CrawledDocument.js';

export class GenericCrawler {
  // Returns a list of domains this crawler is applicable to
  getApplicableDomains() {
    return ['amazon', 'a2z'];
  }

  // Processes a webpage by extracting its text and normalizing it
  process(url, document) {
    const allWords = document.body.innerText; // Extracts all visible text from the page
    const normalizedWords = allWords.replace('\n', ' '); // Replaces newlines with spaces for consistency
    return new CrawledDocument(url, normalizedWords, document.title); // Creates a CrawledDocument instance
  }

  // Checks if a given URL belongs to one of the applicable domains
  isCompatible(url) {
    const domainURL = new URL(url); // Parses the URL
    const domain = domainURL.hostname.toLocaleLowerCase(); // Converts hostname to lowercase for comparison
    let isMatch = false;
    const compatibleDomains = this.getApplicableDomains(); // Retrieves the list of compatible domains

    // Loops through the list of compatible domains and checks if the URL contains any of them
    for (let i = 0; i < compatibleDomains.length; i++) {
      if (domain.indexOf(compatibleDomains[i]) !== -1) {
        isMatch = true;
      }
    }
    return isMatch;
  }
}
