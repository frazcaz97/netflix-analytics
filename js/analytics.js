class analytics {
    constructor(csv) {
        this._csv = csv;
    }

    getDayData() {
        let dateSet = new Set();
        let arr = [];

        for (let row of this._csv) { //get unique dates
            dateSet.add(row[1]);
        }

        for (let date of dateSet) { //count number of recuring days
            let n = 0;
            for (let i = 0; i < this._csv.length; i++) {
                if (this._csv[i][1].includes(date)) {
                    n++;
                }
            }
            arr.push([date, n]);
        }

        return arr;
    }

    getWeekData() {
        return null;
    }

    getMin(data) {
        let minData = {
            date : "",
            count : ""
        }
        let num = Infinity;

        for (let j = 0; j < data.length; j++) {
            if (data[j][1] < num) {  //found new least viewed day
                num = data[j][1];
                minData["date"] = data[j][0]; 
                minData["count"] = data[j][1];
            }
        }
        
        return minData;
    }

    getMax(data) {
        let maxData = {
            date : "",
            count : ""
        }
        let num = 0;
        
        for (let j = 0; j < data.length; j++) {
            if (data[j][1] > num) {  //found new most viewed day
                num = data[j][1];
                maxData["date"] = data[j][0]; 
                maxData["count"] = data[j][1];
            } 
        }

        return maxData;
    }

    getTimeRange(data) {    //return a time in mili for getAverages
        let firstArr = data[data.length-1][0].split("/");
        let lastArr = data[0][0].split("/");
        let firstDay = new Date(firstArr[2],firstArr[1],firstArr[0]).getTime();
        let lastDay = new Date(lastArr[2],lastArr[1],lastArr[0]).getTime();
        let range = lastDay - firstDay;
        return range;
    }

    getNumberWatched(data) {    //return a total of everything watched for getAverages
        let value = 0;
        for (let row of data) {
            value += row[1];
        }
        return value;
    }

    getAverages(data) {
        const timeRange = this.getTimeRange(data);
        const watchCount = this.getNumberWatched(data);
        const days = timeRange / 8.64e+7;
        const weeks = days / 7;
        const years = days / 365.25;
        const months = years * 12;

        return {
            day : watchCount / days,
            week : watchCount / weeks,
            month : watchCount / months,
            year : watchCount / years
        }
    }
}