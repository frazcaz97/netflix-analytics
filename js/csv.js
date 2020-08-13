class csv {
    constructor(file) {
        this._file = file;
        this._csv = [];
    }

    create() {
        let arr = this._file.split("\n");   //each new line is a row
        
        arr.shift();    //we don't need the headers
        arr.pop();  //remove empty index from split

        for (let index of arr) {
            let subarr = index.split('","');    //split up the row by title and data

            for (let index in subarr) {
                subarr[index] = subarr[index].replace('"', ''); //remove additional speach marks created by text upload
            }
            this._csv.push(subarr);
        }
        console.log(this._csv);
    }

    get csv() {
        return this._csv;
    }
}