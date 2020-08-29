const reader = new FileReader();

const setFileName = () => {
    document.getElementById("file-name").innerHTML = document.getElementById("upload").files[0].name;
}

const getFile = function() {
    const file = document.getElementById("upload").files[0];

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
    let a = new analytics();
    const perDayViews = a.getDayViews(csv);
    const perWeekViews = a.getWeekViews(perDayViews);
    const perMonthViews = a.getMonthViews(perDayViews);
    const perYearViews = a.getYearViews(perDayViews);
    const minViews = a.getMinViews(perDayViews);
    const maxViews = a.getMaxViews(perDayViews);
    const totalViews = a.getTotal(perDayViews);
    const averageViews = a.getAverageViews(perDayViews);
}