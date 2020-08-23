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
            getAnalytics(CSV.csv);
            
        }
        reader.readAsText(file);
    }
}

const getAnalytics = function(csv) {
    const perDayData = getDayData(csv);
    const perMonthData = getMonthData(perDayData);
    const perYearData = getYearData(perDayData);
    const min = getMin(perDayData);
    const max = getMax(perDayData);
    const averages = getAverages(perDayData);


    console.log("per day viewings: " + JSON.stringify(perDayData));
    console.log("per month viewings: " + JSON.stringify(perMonthData));
    console.log("per year viewings: " + JSON.stringify(perYearData));
    console.log("minimum day viewings: " + JSON.stringify(min));
    console.log("maximum day viewings: " + JSON.stringify(max));
    console.log("averages: " + JSON.stringify(averages));

}