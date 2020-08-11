class csv {
    constructor(file) {
        this._file = file;
        this._csv = [];
    }

    create() {
        let arr = this._file.split("\n");

        for (let index of arr) {
            let subarr = index.split('","');

            for (let index in subarr) {
                subarr[index] = subarr[index].replace('"', '');
            }
            this._csv.push(subarr);
        }
    }

    get csv() {
        return this._csv;
    }
}