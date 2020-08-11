class apiRequest {
    constructor(title,apiKey) {
        this._title = title;
        this._apiKey = apiKey;
    }

    async readRequest() {
        const url = encodeURI(`http://www.omdbapi.com/?t=${this._title}&apikey=${this._apiKey}`)
        const request = await fetch(url)
        const obj = await request.json();
        return await obj;
    }
}