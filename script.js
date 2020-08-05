const ingestFile = function() {
    const reader = new FileReader();  
    const file = document.getElementById("uploadInput").files[0];
    
    addListeners(reader);

    if (!file.name.includes(".csv")) {
        alert("please upload a csv file");
    } else {
        reader.onload = function() {
            let temp = reader.result.split("\n");
            let csv = [];

            for (let line of temp) {
                csv.push(line.split(","));
            }
        }
        reader.readAsText(file);
    }
}

const addListeners = function(fr) {
    fr.addEventListener('loadstart', function(event) { console.log(event);});
    fr.addEventListener('load', function(event) { console.log(event);});
    fr.addEventListener('loadend', function(event) { console.log(event);});
    fr.addEventListener('progress', function(event) { console.log(event);});
    fr.addEventListener('error', function(event) { console.log(event);});
    fr.addEventListener('abort', function(event) { console.log(event);});
}