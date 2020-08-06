let apikey = document.getElementById("apiKeyField").value;

const ingestFile = function() {     //get file, add listeners, create csv variable
    const reader = new FileReader();
    const file = document.getElementById("uploadInput").files[0];
    
    addListeners(reader);

    //if (!file.name.includes(".csv")) {
    //    alert("please upload a csv file");
    //} else {
        reader.onload = function() {
            let temp = reader.result.split("\n");
            let csv = [];

            for (let line of temp) {
                csv.push(line.split(","));
            }
            getApiResults(csv);
        }
        reader.readAsText(file);
    //}
}

const addListeners = function(fr) {
    fr.addEventListener('loadstart', event => handleEvent(event));
    fr.addEventListener('load', event => handleEvent(event));
    fr.addEventListener('loadend', event => handleEvent(event));
    fr.addEventListener('progress', event => handleEvent(event));
    fr.addEventListener('error', event => handleEvent(event));
    fr.addEventListener('abort', event => handleEvent(event));
}

const handleEvent = function(event) {   //unfinished file
    console.log(event);

    switch (event.type) {
        case 'loadstart':
            console.log("file upload started");
            break;
        case 'load':
            console.log("file upload load successfully");
            break;
        case 'loadend':
            console.log("file upload finished");
            break;
        case 'progress':
            console.log("file upload in progress");
            progressHistogram(event.loaded,event.total);    //tempory function
            break;
        case 'error':
            console.log("file upload error");
            alert("There was an error uploading your file please try again");
            break;
        case 'abort':
            console.log("file upload aborted");
            break;
    }
}

const progressHistogram = function(current,total) {     //unfinished function
    console.log(`Current: ${current}`);
    console.log(`TotalL ${total}`);
}

const getApiResults = function(csvFile) {   //unfinished function
    console.log(`csv: ${csvFile}`);
}

const apiRequest = function(title) {
    const request = fetch(`http://www.omdbapi.com/?t=${title}&apikey=${apikey}`)
        .then(response => response.json())
        .then(data => data);
    return request;
}