export class CrawledDocument {
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