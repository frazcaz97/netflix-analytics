let apiKey = "";
const reader = new FileReader();

const getFile = function() {
    const file = document.getElementById("uploadInput").files[0];

    if (!file.name.includes(".csv")) {  //only accept csv files
        alert("please upload a csv file");
    } else {
        reader.onabort = function() {
            document.getElementById("progressText").innerHTML = "File upload aborted";
        }
        reader.onerror = function() {
            document.getElementById("progressText").innerHTML = "ERROR: please try uploading the file again";
        }
        reader.onprogress = function(event) {   //TEMP this will be used for the progress bar
            console.log("current: " + event.loaded);
            console.log("total: " + event.total);
        }
        reader.onload = function(event) {
            let CSV = new csv(event.target.result); //create csv out of text file
            CSV.create();
            createAnalytics(CSV.csv);
            
        }
        reader.readAsText(file);
    }
}

const createAnalytics = function(file) {

    
}