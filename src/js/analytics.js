class analytics {
constructor() {/*class for nameSpace*/}

    getDateObject(date) { //returns an object of day, month, year
        const arr = date.split("/");
        return { day : arr[0], month : arr[1], year : arr[2] };
    }

    getDayViews(data) { //return array of each days total viewings
        let [days, result] = [new Set(), []];

        for (let row of data)   //create a set of days
            days.add(row[1]);

        for (let date of days) {   //count up total views for each day
            let value = 0;
            for (let i = 0; i < data.length; i++) {
                value += data[i][1].includes(date) ? 1 : 0;
            }
            result.push({ date : date, views : value });
        }
        return result;
    }

    getWeekViews(data) {
        let [id, weeks, weekViews, result] = ["", new Set(), [], []];

        const isInRange = (value, min, max) => {    //check if day is in range of week
            return value >= min && value <= max ? true : false;
        }

        for (let day of data) { //create set of unique weeks and array of weeks + views objects
            let date = this.getDateObject(day["date"]);   //transform date string into object to compare

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

            weeks.add(JSON.stringify({ week : id, month : date["month"], year : date["year"] }));
            weekViews.push({ week : id, month : date["month"], year : date["year"], views : day["views"] });
        }
        
        for (let week of weeks) {   //count all views for each unique week
            let value = 0;
            week = JSON.parse(week);
            for (let views of weekViews) {
                if (week["year"] === views["year"]) {
                    if (week["month"] === views["month"]) {
                        if (week["week"] === views["week"]) {
                            value += views["views"];
                        }
                    }
                }
            }
            result.push({ week : week["week"], month : week["month"], year : week["year"], views: value });
        }
        return result;
    }

    getMonthViews(data) {
        let [months, result] = [new Set(), []];

        for (let row of data) { //create set of unique months
            let value = this.getDateObject(row["date"]);
            months.add(JSON.stringify({ month : value["month"], year : value["year"] }));
        }

        for (let month of months) { //count all views for each unique month
            let value = 0;
            month = JSON.parse(month);

            for (let i = 0; i < data.length; i++) {
                const date = this.getDateObject(data[i]["date"]);  //transform date string into object to compare
                if (date["year"].includes(month["year"])) {
                    if (date["month"].includes(month["month"])) {
                        value += data[i]["views"];
                    }
                }
            }
            result.push({ month : month["month"], year : month["year"], views : value });
        }
        return result;
    }
    
    getYearViews(data) { //return array of each years total viewings
        let [years, result] = [new Set(), []];

        for (let row of data) {    //create a set of years
            let value = this.getDateObject(row["date"]);
            years.add(value.year);
        }
        
        for (let year of years) {   //count up total views for each year
            let value = 0;
            for (let i = 0; i < data.length; i++) {
                if (data[i]["date"].includes(year)) {
                    value += data[i]["views"];
                }
            }
            result.push({ year : year, value : value });
        }
        return result;
    }

    getMinViews(data) { //return least watched day
        let [num, date, value] = [Infinity, "", Infinity];

        for (let i = 0; i < data.length; i++) {
            if (data[i]["views"] < num) {  //found new least viewed day
                [num, date, value] = [data[i]["views"], data[i]["date"], data[i]["views"]];
            }
        }   
        return { date : date, value : value };
    }

    getMaxViews(data) { //return most watched day
        let [num, date, value] = [0, "", 0];
        
        for (let i = 0; i < data.length; i++) {
            if (data[i]["views"] > num) {  //found new most viewed day
                [num, date, value] = [data[i]["views"], data[i]["date"], data[i]["views"]];
            } 
        }
        return { date : date, value : value };
    }

    getTotal(data) {    //return total views
        let value = 0;

        for (let row of data) {
            value += row["views"];
        }
        return value;
    }

    getAverageViews(data) {
        const elapsedTime = (first, last) => {    //return elapsed time of two dates
            let [ft, lt] = [first.split("/"), last.split("/")];
            ft = new Date(ft[2],ft[1],ft[0]).getTime();
            lt = new Date(lt[2],lt[1],lt[0]).getTime();
            return (lt - ft) * -1;
        }

        let total = 0;  //return total views in history
        data.forEach(element => {
            total += element["views"];
        });

        const days = elapsedTime(data[0]["date"], data[data.length-1]["date"]) / 8.64e+7;
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