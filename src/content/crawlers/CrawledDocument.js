// Document class for storing crawled webpage data
export class CrawledDocument {
  // Constructor method that initializes a new instance of CrawledDocument
  // Takes three parameters: id, allText, and title
  constructor(id, allText, title) {
    // URL or unique identifier
    this.id = id;

    // Main content text
    this.allText = allText;

    // Page title
    this.title = title;
  }

  // Get document URL
  getId() {
    return this.id;
  }

  // Get document content
  getAllText() {
    return this.allText;
  }

  // Get page title
  getTitle() {
    return this.title;
  }
}
