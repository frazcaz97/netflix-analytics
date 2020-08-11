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
            getApiData(newCSV.csv);
            
        }
        reader.readAsText(file);
    }
}

const getApiData = async function(file) {
    const key = document.getElementById("apiKeyField").nodeValue;

    if (key == "") {
        alert("please enter your OMDB key");
    }
    else {
        console.log(file);
        //find out if title has more than one colon

        for (let i = 1; i < file.length; i++) {
            console.log(file[i][0]);
            let title = file[i][0];
            let count = 0;
            title = "One-Punch Man: Season 1: The Strongest Man";
            for (let character in title) {
                console.log(title[character]);
                if (title[character] == ":") {
                    console.log("there's a colon here");
                    count++;
                }
            }
            console.log(count);
            if (count > 1) {
                file[i][2] = "TV";
            } else {
                file[i][2] = "Film";
            }
            console.log(file[i][2]);
        }






            // if (!arr.includes(title)) {
            //     arr.push(title);
            // }  
        //}
        //console.log(arr); //this line to the console.log at the bottom are what we need to keep
        // let count = 0;
        // for (let index of arr) {
        //     const request = new apiRequest(index,"4966ddb3"); //replace with API key 
        //     const data = await request.readRequest();
        //     console.log(data);
        //     count++;
        // }
        // console.log("requests made: " + count, " requests needed: " + arr.length);
    }
}