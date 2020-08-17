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
    const baseDataSet = function() {
        let dateSet = new Set();
        let arr = [];

        for (let row of file) { //get unique dates
            dateSet.add(row[1]);
        }

        for (let date of dateSet) { //count number of recuring days
            let n = 0;
            for (let i = 0; i < file.length; i++) {
                if (file[i][1].includes(date)) {
                    n++;
                }
            }
            arr.push([date, n]);
        }
        return arr;
    }

    const getExtremes = function(data) {
        let extremes = {
            high: {
                date: "",
                count: 0
            },
            low: {
                date: "",
                count: 0
            }
        }

        let highNum = 0;
        let lowNum = Infinity;
        
        for (let j = 0; j < data.length; j++) {
            if (data[j][1] > highNum) {  //found new most viewed day
                highNum = data[j][1];
                extremes["high"]["date"] = data[j][0]; 
                extremes["high"]["count"] = data[j][1];
            } 
            else if (data[j][1] < lowNum) {  //found new least viewed day
                lowNum = data[j][1];
                extremes["low"]["date"] = data[j][0]; 
                extremes["low"]["count"] = data[j][1];
            }
        }
        return extremes;
    }

    const getAverages = function (data) {
        //get day average by counting all and dividing by the number of days
        //how do we get the average for weeks and months though
    }

    let data = baseDataSet();
    let dataSetOne = getExtremes(data);
    let dataSetTwo = getAverages(data);
    console.log(data);
    console.log(dataSetOne);
}