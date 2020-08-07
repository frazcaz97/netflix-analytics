let apiKey = "";
let csvFile = [];
const reader = new FileReader();

const getFile = function() {
    
    const file = document.getElementById("uploadInput").files[0];

    if (!file.name.includes(".csv")) {
        alert("please upload a csv file");
    } else {
        reader.onprogress = function(event) {
            console.log("current: " + event.loaded);
            console.log("total: " + event.total);
        }
        reader.onload = function(event) {
            let newCSV = new csv(event.target.result);
            newCSV.create();
            csvFile = newCSV.csv;
            

        }
        reader.readAsText(file);
    }
}

