const reader = new FileReader();
let file;
let csv = [];
let runDebug = false;

let getFile = function(event) {
    debug("uploading file");
    file = event.target;
    checkFileType(file.files[0].name);
    debug(file.files[0].name);
}

let processFile = function() {
    debug("processing file");
    reader.onload = function() {
        const text = reader.result;
        convertToCSV(text);
    };
    reader.readAsText(file.files[0]);
}

let checkFileType = function(fileName) {
    if (!fileName.files[0].name.includes(".csv")) {
        alert("please upload a csv file");
    }
}

let convertToCSV = function(text) {
    let lines = text.split("\n");
    for (let line in lines) {
        csv.push(lines[line].split(","));   //2D array, first is row, second is column 
        debug(csv);
    }
}

let debug = function(value) {
    if (runDebug) {
        console.log(value);
    }
}
