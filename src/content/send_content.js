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
    return ['quip-amazon'];
  }

  process(url, document) {
    const allWords = document.body.innerText;
    const normalizedWords = allWords.replace(/(\r\n|\n|\r)/gm, ' ');
    const index = url.lastIndexOf('#');
    let normalizedUrl = url;
    if (index !== -1) {
      normalizedUrl = url.substring(0, index);
    }
    return new CrawledDocument(normalizedUrl, normalizedWords, document.title);
  }

  isCompatible(url) {
    const domainURL = (new URL(url));
    const domain = domainURL.hostname.toLocaleLowerCase();
    let isMatch = false;
    const compatibleDomains = this.getApplicableDomains();
    for (let i = 0; i < compatibleDomains.length; i++) {
      if (domain.indexOf(compatibleDomains[i]) !== -1) {
        isMatch = true;
      }
    }
    return isMatch;
  }
}

class GenericCrawler {
  getApplicableDomains() {
    return ['amazon', 'a2z'];
  }

  process(url, document) {
    const allWords = document.body.innerText;
    const normalizedWords = allWords.replace('\n', ' ');
    return new CrawledDocument(url, normalizedWords, document.title);
  }

  isCompatible(url) {
    const domainURL = (new URL(url));
    const domain = domainURL.hostname.toLocaleLowerCase();
    let isMatch = false;
    const compatibleDomains = this.getApplicableDomains();
    for (let i = 0; i < compatibleDomains.length; i++) {
      if (domain.indexOf(compatibleDomains[i]) !== -1) {
        isMatch = true;
      }
    }
    return isMatch;
  }
}

class RuleChecker {
  constructor() {
    this.sitesList = [];
    this.urlsList = [];
    this.matchesList = [];
    this.regexList = [];
    this.rulesLoaded = false;
  }

  loadRules() {
    return new Promise((resolve) => {
      chrome.storage.local.get(['allowedSites', 'allowedURLs', 'allowedStringMatches', 'allowedRegex'], (result) => {
        this.sitesList = result.allowedSites || [];
        this.urlsList = result.allowedURLs || [];
        this.matchesList = result.allowedStringMatches || [];
        this.regexList = result.allowedRegex || [];
        this.rulesLoaded = true;
        console.log('Rules loaded:', {
          sites: this.sitesList.length,
          urls: this.urlsList.length,
          matches: this.matchesList.length,
          regex: this.regexList.length,
        });
        resolve();
      });
    });
  }

  checkSitesList(url) {
    try {
      const currentHostname = new URL(url).hostname.toLowerCase();
      return this.sitesList.some((site) => currentHostname.includes(site.toLowerCase()));
    } catch (e) {
      console.error('Error in checkSitesList:', e);
      return false;
    }
  }

  checkUrlsList(url) {
    return this.urlsList.includes(url);
  }

  checkStringMatchesList(url) {
    return this.matchesList.some((match) => url.toLowerCase().includes(match.toLowerCase()));
  }

  checkRegexList(url) {
    return this.regexList.some((regex) => {
      try {
        return new RegExp(regex, 'i').test(url);
      } catch (e) {
        console.error('Invalid regex pattern:', regex, e);
        return false;
      }
    });
  }

  shouldIndex(url) {
    if (!this.rulesLoaded) {
      console.warn('Rules not loaded yet, using default crawler compatibility check');
      return null;
    }

    // Check all rule types
    const siteMatch = this.checkSitesList(url);
    const urlMatch = this.checkUrlsList(url);
    const stringMatch = this.checkStringMatchesList(url);
    const regexMatch = this.checkRegexList(url);

    // If any rule matches, we should index
    const shouldIndex = siteMatch || urlMatch || stringMatch || regexMatch;

    console.log(`URL '${url}' indexing decision:`, {
      siteMatch,
      urlMatch,
      stringMatch,
      regexMatch,
      result: shouldIndex ? 'WILL INDEX' : 'WILL NOT INDEX',
    });

    return shouldIndex;
  }
}

const crawlers = [new QuipCrawler(), new GenericCrawler()];

const indexDocument = (doc) => {
  console.log('Starting document indexing...');
  // Update UI to show indexing is active
  chrome.runtime.sendMessage({ type: 'indexing_status', status: 'enabled' });

  chrome.runtime.sendMessage({ document: doc }, (response) => {
    console.log('Document processing response:', response);
    // Only disable the indicator if we're not about to start another indexing cycle
    setTimeout(() => {
      chrome.runtime.sendMessage({ type: 'indexing_status', status: 'disabled' });
    }, 14900); // Set slightly before the next indexing cycle
  });
};

const scrapePage = () => {
  // Only process complete pages
  if (document.readyState !== 'complete') {
    return;
  }

  const url = window.location.href;

  // Check against user-defined rules first
  const shouldIndex = ruleChecker.shouldIndex(url);

  // If rules are loaded and URL doesn't match any rules, check crawler compatibility
  if (shouldIndex === false) {
    // Check if any crawler is compatible with this URL
    for (const crawler of crawlers) {
      if (crawler.isCompatible(url)) {
        chrome.runtime.sendMessage({ type: 'indexing_status', status: 'enabled' });
        const crawledDocument = crawler.process(url, document);
        indexDocument(crawledDocument);
        console.log('Document Crawled (crawler compatibility):', crawledDocument.getId());
        return;
      }
    }
    // Update UI to show not indexing
    chrome.runtime.sendMessage({ type: 'indexing_status', status: 'disabled' });
    console.log("Page not indexed: doesn't match any rules or crawler domains");
    return;
  }

  // If URL matches rules or rules aren't loaded yet, try to index with any compatible crawler
  for (const crawler of crawlers) {
    if (shouldIndex === true || crawler.isCompatible(url)) {
      chrome.runtime.sendMessage({ type: 'indexing_status', status: 'enabled' });
      const crawledDocument = crawler.process(url, document);
      indexDocument(crawledDocument);
      console.log('Document Crawled:', crawledDocument.getId());
      return;
    }
  }
  // If we get here, no crawler was compatible
  chrome.runtime.sendMessage({ type: 'indexing_status', status: 'disabled' });
};

setInterval(scrapePage, 15000);

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local') {
    const ruleKeys = ['allowedSites', 'allowedURLs', 'allowedStringMatches', 'allowedRegex'];
    const shouldReload = ruleKeys.some((key) => changes[key]);

    if (shouldReload) {
      console.log('Indexing rules changed, reloading rules');
      ruleChecker.loadRules();
    }
  }
});

// Initialize rule checker
const ruleChecker = new RuleChecker();

// Function to convert crawler domains to regex patterns
function initializeDefaultRules() {
  chrome.storage.local.get(['allowedSites', 'allowedURLs', 'allowedStringMatches', 'allowedRegex'], (result) => {
    const hasAnyRules = (result.allowedSites && result.allowedSites.length > 0)
                           || (result.allowedURLs && result.allowedURLs.length > 0)
                           || (result.allowedStringMatches && result.allowedStringMatches.length > 0)
                           || (result.allowedRegex && result.allowedRegex.length > 0);

    if (!hasAnyRules) {
      console.log('No rules found, adding default rules from crawler domains');

      // Get domains from crawlers and convert to regex patterns
      const defaultRegexPatterns = [];
      for (const crawler of crawlers) {
        if (crawler.getApplicableDomains) {
          const domains = crawler.getApplicableDomains();
          for (const domain of domains) {
            // Create a regex that matches any URL containing the domain
            defaultRegexPatterns.push(`.*${domain}.*`);
          }
        }
      }

      // Remove duplicates
      const uniquePatterns = [...new Set(defaultRegexPatterns)];

      // Save to storage as regex patterns
      if (uniquePatterns.length > 0) {
        chrome.storage.local.set({ allowedRegex: uniquePatterns }, () => {
          console.log('Added default regex patterns:', uniquePatterns);
          // Reload rules after adding defaults
          ruleChecker.loadRules();
        });
      }
    }
  });
}

// Load rules and initialize defaults
ruleChecker.loadRules().then(() => {
  initializeDefaultRules();
});

console.log('CONTENT SCRIPT: Hello World');
