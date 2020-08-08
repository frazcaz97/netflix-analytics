class apiRequest {
    constructor(title,apiKey) {
        this._title = title;
        this._apiKey = apiKey;
        this._data = null;
    }

    async runRequest() {
        const url = encodeURI(`http://www.omdbapi.com/?t=${this._title}&apikey=${this._apiKey}`)
        const request = await fetch(url)
        const data = await request.json();
        return data;
    }

    get data() {
        return this._data;
    }
}