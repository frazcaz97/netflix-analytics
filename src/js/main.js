import { createCSV } from "./csv.js";
import { CreateAnalytics } from "./analytics/create-analytics.js";

const reader = new FileReader();
let startTime;

const setFileName = () => {
    const filename = document.getElementById("upload").files[0].name;

    if (filename.includes(".csv")) {
        document.getElementById("file-name-field").setAttribute("style", "color: #34c22d; border-bottom: 2px solid #34c22d;");
        document.getElementById("file-name-field").innerHTML = filename;
        document.getElementById("submit").disabled = false;
        document.getElementById("submit-label").setAttribute("style", "");
    } else {
        document.getElementById("file-name-field").setAttribute("style", "color: #ffffff; border-bottom: 2px solid #ffffff;");
        document.getElementById("file-name-field").innerHTML = "incorrect file type, expected a csv file";
        document.getElementById("submit").disabled = true;
        document.getElementById("submit-label").setAttribute("style", "opacity: 50%; pointer-events: none;");
    }
}

const getFile = () => {
    startTime = new Date().getTime();
    const file = document.getElementById("upload").files[0];

    if (!file.name.includes(".csv")) {  //only accept csv files
        alert("incorrect file type submitted, expected: '.csv'");
    } else {
        reader.onabort = function() {
            document.getElementById("progressText").innerHTML = "File upload aborted";
        }
        reader.onerror = function() {
            document.getElementById("progressText").innerHTML = "ERROR: please try uploading the file again";
        }
        reader.onprogress = function(event) {
            document.getElementById("progress-field").style.display = "block";
            document.getElementById("progress-field").innerHTML = "Uploading csv file...";
        }
        reader.onload = function(event) {
            getAnalytics(event.target.result);
        }
        reader.readAsText(file);
    }
}

const getAnalytics = file => {
    document.getElementById("progress-field").innerHTML = "generating analytics...";
    const analytics = new CreateAnalytics(createCSV(file));
    analytics.createData();
    showAnalytics(analytics.data);
}

const showAnalytics = data => {
    const endTime = new Date().getTime();
    const elapsedTime = (endTime - startTime);
    console.log(elapsedTime + " milliseconds");
    document.getElementById("progress-field").style.display = "none";
    document.getElementById("show-btn-home").style.display = "inline";
}


document.getElementById("upload").addEventListener("change", setFileName);
document.getElementById("submit").addEventListener("click", getFile);