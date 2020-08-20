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
    const Analytics = new analytics(csv);
    const perDayData = Analytics.getDayData();
    const perWeekData = Analytics.getWeekDate();
    const min = Analytics.getMin(perDayData);
    const max = Analytics.getMax(perDayData);
    const averages = Analytics.getAverages(perDayData);


    console.log(perDayData);
    console.log(perWeekData);
    console.log(min);
    console.log(max);
    console.log(averages);

}