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

const getAnalytics = csv => {
    let a = new analytics();
    const perDayViews = a.getDayViews(csv);
    const perWeekViews = a.getWeekViews(perDayViews);
    const perMonthViews = a.getMonthViews(perDayViews);
    const perYearViews = a.getYearViews(perDayViews);
    const minViews = a.getMinViews(perDayViews);
    const maxViews = a.getMaxViews(perDayViews);
    const totalViews = a.getTotal(perDayViews);
    const averageViews = a.getAverageViews(perDayViews);

    showAnalytics();
}

const showAnalytics = () => {
    const endTime = new Date().getTime();
    const elapsedTime = (endTime - startTime);
    console.log(elapsedTime + " milliseconds");
    document.getElementById("show-btn").style.display = "inline";
}