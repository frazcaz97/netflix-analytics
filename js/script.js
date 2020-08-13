let apiKey = "";

const reader = new FileReader();

const getFile = function() {
    const file = document.getElementById("uploadInput").files[0];

    if (!file.name.includes(".csv")) {
        alert("please upload a csv file");
    } else {
        reader.onabort = function() {
            document.getElementById("progressText").innerHTML = "File upload aborted";
        }
        reader.onerror = function() {
            document.getElementById("progressText").innerHTML = "ERROR: please try uploading the file again";
        }
        reader.onprogress = function(event) {
            console.log("current: " + event.loaded);
            console.log("total: " + event.total);
        }
        reader.onload = function(event) {
            let newCSV = new csv(event.target.result);
            newCSV.create();
            //run analytics here
            
        }
        reader.readAsText(file);
    }
}