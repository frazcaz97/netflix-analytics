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

    const getFilmOrTV = function(file) {
        for (let title in file) {
            if (file[title][0].includes(":")) {
                let colonCount = 0;

                for (let char of file[title][0]) {
                    colonCount += char == ":" ? 1 : 0;
                }
                file[title][2] = colonCount == 1 ? "Film" : "TV";   //films <= 1 :, TV >= 2
            }
            else {
                file[title][2] = "Film";    //no : means its a film
            }
        }
    }

    const getTotals = function(file) {
        let noFilms = 0;
        let noTVShows = 0;
        let noTVEpisodes = 0;
        let totalEntries = file.length;

        for (let row of file) {
            if (row[2] == "Film") {
                noFilms++;
            } else {
                noTVEpisodes++;
                //create a temp array of unique tv shows, need to figure out how to get this unique data set
            }
        }
        return {noFilms: noFilms, noTVShows: noTVEpisodes, noTVEpisodes: noTVEpisodes, totalEntries: totalEntries};
    }

    getFilmOrTV(file);
    const totals = getTotals(file);
}
