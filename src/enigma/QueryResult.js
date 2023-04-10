class QueryResult {
    title;
    link;
    snippet;
    constructor(title, link, snippet) {
        this.title = title
        this.link = link
        this.snippet = snippet
    }
    get title() {
        return this.title
    }
    get link() {
        return this.link
    }
    get snippet() {
        return this.snippet
    }
}
module.exports = QueryResult
