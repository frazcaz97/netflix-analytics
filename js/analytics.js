class analytics {
constructor() {/*class for nameSpace*/}
    //TO BE REFACTORED--------------------------------------------------------
    getDateObject(date) { //returns an object of day, month, year
        let arr = date.split("/");
        return {
            day : arr[0],
            month : arr[1],
            year : arr[2]
        }
    }

    getDayViews(data) { //return array of each days total viewings
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

    getWeekViews(data) {
        let id = "";
        let weeks = new Set();
        let weeksAndViews = [];
        let result = [];

        const isInRange = (value, min, max) => {    //check if day is in range of week
            return value >= min && value <= max ? true : false;
        }

        for (let day of data) { //create set of unique weeks and array of weeks + views objects
            let date = this.getDateObject(day[0]);   //transform date string into object to compare

            if (isInRange(date["day"], 1, 7)) {
                id = "week 1";
            } else if (isInRange(date["day"], 8, 14)) {
                id = "week 2";
            } else if (isInRange(date["day"], 15, 21)) {
                id = "week 3";
            } else if (isInRange(date["day"], 22, 28)) {
                id = "week 4";
            } else {
                id = "week 5";
            }
            weeks.add(JSON.stringify({week : id, month : date["month"], year : date["year"]}));
            weeksAndViews.push({week : id, month : date["month"], year : date["year"], views : day[1]});
        }
        
        for (let week of weeks) {   //count all views for each unique week
            let n = 0;
            week = JSON.parse(week);
            for (let views of weeksAndViews) {
                if (week["year"] === views["year"]) {
                    if (week["month"] === views["month"]) {
                        if (week["week"] === views["week"]) {
                            n += views["views"];
                        }
                    }
                }
            }
            result.push({week : week["week"], month : week["month"], year : week["year"], views: n});
        }
        return result;
    }

    getMonthViews(data) {
        let months = new Set();
        let arr = [];

        for (let row of data) { //create set of unique months
            let value = this.getDateObject(row[0]);
            months.add(JSON.stringify({month : value.month, year : value.year}));
        }

        for (let month of months) { //count all views for each unique month
            let n = 0;
            let date1 = JSON.parse(month);

            for (let i = 0; i < data.length; i++) {
                let date2 = this.getDateObject(data[i][0]);  //transform date string into object to compare

                if (date2["year"].includes(date1["year"])) {

                    if (date2["month"].includes(date1["month"])) {
                        n += data[i][1];
                    }
                }
            }

            arr.push([date1.month, date1.year, n]);
        }
        return arr;
    }
    //END OF STUFF TO REFACTOR-----------------------------------------------------------------
    getYearViews(data) { //return array of each years total viewings
        let [years, result] = [new Set(), []];

        for (let row of data) {    //create a set of years
            let value = this.getDateObject(row[0]);
            years.add(value.year);
        }
        
        for (let year of years) {   //count up total views for each year
            let value = 0;
            for (let i = 0; i < data.length; i++) {
                if (data[i][0].includes(year)) {
                    value += data[i][1];
                }
            }
            result.push({year : year, value : value});
        }
        return result;
    }

    getMinViews(data) { //return least watched day
        let [num, date, value] = [Infinity, "", Infinity];

        for (let i = 0; i < data.length; i++) {
            if (data[i][1] < num) {  //found new least viewed day
                [num, date, value] = [data[i][1], data[i][0], data[i][1]];
            }
        }   
        return {date : date, value : value};
    }

    getMaxViews(data) { //return most watched day
        let [num, date, value] = [0, "", 0];
        
        for (let i = 0; i < data.length; i++) {
            if (data[i][1] > num) {  //found new most viewed day
                [num, date, value] = [data[i][1], data[i][0], data[i][1]];
            } 
        }
        return {date : date, value : value};
    }

    getAverageViews(data) {
        const elapsedTime = (first, last) => {    //return elapsed time of two dates
            const ft = new Date(first).getTime();
            const lt = new Date(last).getTime();
            return (lt - ft) * -1;
        }

        let total = 0;  //return total views in history
        data.forEach(element => {
            total += element[1];
        });

        const days = elapsedTime(data[0][0], data[data.length-1][0]) / 8.64e+7;
        const weeks = days / 7;
        const years = days / 365.25;
        const months = years * 12;

        return {
            day : (total / days).toFixed(1),
            week : (total / weeks).toFixed(1),
            month : (total / months).toFixed(1),
            year : (total / years).toFixed(1)
        }
    }
}