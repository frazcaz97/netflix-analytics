import { createCSV } from "./csv.js";
import { CreateAnalytics } from "./analytics/create-analytics.js";
import { Table } from "./analytics/analytical-graphics/table.js";

//temporary import for automatic csv loading
import { loadData } from "./load-data.js";
//end of temporary

const reader = new FileReader();
let data;

//temporary function call for loading csv data automatically
let autoloadcsv = async () => {
    return await loadData();
}
//end of temporary

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

//temporary function to autoload csv data

const getAnalytics = async () => {
    let csvData = await autoloadcsv();
    const analytics = new CreateAnalytics(createCSV(csvData));
    analytics.createData();
    data = analytics.data;
    displayAnalytics();
}
getAnalytics();

//end of temporary

//function is needed but will be using an altered version for auto loading csv

// const getAnalytics = file => {
//     document.getElementById("progress-field").innerHTML = "generating analytics...";

//     const analytics = new CreateAnalytics(createCSV(file));
//     analytics.createData();
//     data = analytics.data;

//     document.getElementById("progress-field").style.display = "none";
//     document.getElementById("show-btn-home").style.display = "inline";
//     displayAnalytics();
// }
//--------------------------------------------------------------------------------------------

const displayAnalytics = () => {

    //check if page is analytics, if it is then we can draw the analytics displays to size
    const isAnalyticsPage = () => {
        if (document.getElementById("analytics-page-container").style.display !== "none") {
            createDisplays();
        }
    }
    const interval = setInterval(isAnalyticsPage, 100);

    //initialise all analytics objects
    const createDisplays = () => {
        clearInterval(interval);

        const tableData = {
            "total" : data[6],
            "least" : data[4],
            "most" : data[5],
            "activity" : data[9]
        } 

        let table = new Table(tableData);
        //add pie chart here
        //add graph chart here
    }
}

document.getElementById("upload").addEventListener("change", setFileName);
document.getElementById("submit").addEventListener("click", getFile);
