class csv {
    constructor(file) {
        this._file = file;
        this._csv = [];
    }

    create() {
        let temp = this._file.split("\n");
        for (let line of temp) {
            this._csv.push(line.split(","));
        }
    }

    get csv() {
        return this._csv;
    }
}