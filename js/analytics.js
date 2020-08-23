const getDateObject = date => { //returns an object of day, month, year
    let arr = date.split("/");
    return {
        day : arr[0],
        month : arr[1],
        year : arr[2]
    }
}

const getDayData = data => { //return array of each days total viewings
    let days = new Set();
    let arr = [];

    for (let row of data) {    //create a set of days
        days.add(row[1]);
    }

    for (let date of days) {   //count up total views for each day
        let n = 0;
        for (let i = 0; i <data.length; i++) {
            if (data[i][1].includes(date)) {
                n++;
            }
        }
        arr.push([date, n]);
    }

    return arr;
}

const getWeekData = data => {
    return null;
}

const getMonthData = data => {
    return null;
}

const getYearData = data => { //return array of each years total viewings
    let years = new Set();
    let arr = [];

    for (let row of data) {    //create a set of years
        let value = getDateObject(row[0]);
        years.add(value.year);
    }
    
    for (let year of years) {   //count up total views for each year
        let n = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i][0].includes(year)) {
                n += data[i][1];
            }
        }
        arr.push([year, n]);
    }
    return arr;
}

const getMin = data => {
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

const getMax = data => {
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

const getAverages = data => {
    const timeRange = (firstDay, lastDay) => {    //return a time range in mili
        let lastArr = lastDay.split("/");
        let firstArr = firstDay.split("/");
        let firstDayMili = new Date(firstArr[2],firstArr[1],firstArr[0]).getTime();
        let lastDayMili = new Date(lastArr[2],lastArr[1],lastArr[0]).getTime();
        let range = (lastDayMili - firstDayMili) * -1;
        return range;
    }

    const watchCount = data => {    //return a total of everything watched
        let value = 0;
        for (let row of data) {
            value += row[1];
        }
        return value;
    }

    const days = timeRange(data[0][0], data[data.length-1][0]) / 8.64e+7;
    const weeks = days / 7;
    const years = days / 365.25;
    const months = years * 12;

    return {
        day : watchCount(data) / days,
        week : watchCount(data) / weeks,
        month : watchCount(data) / months,
        year : watchCount(data) / years
    }
}