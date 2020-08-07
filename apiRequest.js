class apiRequest {
    constructor(title,apiKey) {
        this.title = title;
        this.apiKey = apiKey;
        this._data = null;
    }

    makeRequest() {
        const request = fetch(`http://www.omdbapi.com/?t=${this.title}&apikey=${this.apikey}`)
        .then(response => response.json())
        .then(data => data);
        this._data = request;
    }

    get data() {
        return this._data;
    }
}