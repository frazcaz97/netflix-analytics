class Analytics {

    constructor(csv) {
        this._csv = csv;
    }

    dateObject(date) { //returns an object of day, month, year
        const arr = date.split("/");
        return { day : arr[0], month : arr[1], year : arr[2] };
    }

    dayViews(data) { //return array of each days total viewings
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

    weekViews(data) {
        let [id, weeks, weekViews, result] = ["", new Set(), [], []];

        const isInRange = (value, min, max) => {    //check if day is in range of week
            return value >= min && value <= max ? true : false;
        }

        for (let day of data) { //create set of unique weeks and array of weeks + views objects
            let date = this.dateObject(day["date"]);   //transform date string into object to compare

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

    monthViews(data) {
        let [months, result] = [new Set(), []];

        for (let row of data) { //create set of unique months
            let value = this.dateObject(row["date"]);
            months.add(JSON.stringify({ month : value["month"], year : value["year"] }));
        }

        for (let month of months) { //count all views for each unique month
            let value = 0;
            month = JSON.parse(month);

            for (let i = 0; i < data.length; i++) {
                const date = this.dateObject(data[i]["date"]);  //transform date string into object to compare
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
    
    yearViews(data) { //return array of each years total viewings
        let [years, result] = [new Set(), []];

        for (let row of data) {    //create a set of years
            let value = this.dateObject(row["date"]);
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

    minViews(data) { //return least watched day
        let [num, date, value] = [Infinity, "", Infinity];

        for (let i = 0; i < data.length; i++) {
            if (data[i]["views"] < num) {  //found new least viewed day
                [num, date, value] = [data[i]["views"], data[i]["date"], data[i]["views"]];
            }
        }   
        return { date : date, value : value };
    }

    maxViews(data) { //return most watched day
        let [num, date, value] = [0, "", 0];
        
        for (let i = 0; i < data.length; i++) {
            if (data[i]["views"] > num) {  //found new most viewed day
                [num, date, value] = [data[i]["views"], data[i]["date"], data[i]["views"]];
            } 
        }
        return { date : date, value : value };
    }

    total(data) {    //return total views
        let value = 0;

        for (let row of data) {
            value += row["views"];
        }
        return value;
    }

    averageViews(data) {
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

    dayAverages(data) {  //return each day of the weeks average views
        let dayArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let result = {};

        for (let row in data) { //get the day for each row
            let dateObj = this.dateObject(data[row]["date"]);
            let dayNum = new Date(dateObj["year"] + "/" + dateObj["month"] + "/" + dateObj["day"]).getDay();
            data[row]["day"] = dayArr[dayNum];;
        }

        for (let day of dayArr) {   //get the average for each day
            let dayTotal = 0;
            let count = 0;
            let avg = 0;

            for (let i = 0; i < data.length; i++) {
                if (data[i]["day"].includes(day)) {
                    dayTotal += data[i]["views"];
                    count++;
                }
            }

            avg = dayTotal / count;
            result[day] = avg.toFixed(2);
        }

        return result;
    }

    activity(data) { //return most/ least active day and week/weekend activity

                let mostActiveDay = {
                    day: "",
                    value: 0
                }

                let leastActiveDay = {
                    day : "",
                    value : Infinity
                }

                let [week, weekend, activityString] = [0, 0, ""];

                for (let day in data) {

                    if (data[day] < leastActiveDay["value"]) {  //found new least active day
                        leastActiveDay["day"] = day;
                        leastActiveDay["value"] = data[day];
                    }

                    if (data[day] > mostActiveDay["value"]) {   //found new most active day
                        mostActiveDay["day"] = day;
                        mostActiveDay["value"] = data[day];
                    }

                    switch(day.toUpperCase()) { //total week/ weekend views
                        case "MONDAY" :
                        case "TUESDAY" :
                        case "WEDNESDAY" :
                        case "THURSDAY" :
                        case "FRIDAY" :
                            week += parseFloat(data[day]);
                            break; 

                        case "SATURDAY" :
                        case "SUNDAY" :
                            weekend += parseFloat(data[day]);
                            break;
                    }
                }

                if (week > weekend) { 
                    activityString = "you are more active on week days";
                } else {
                    activityString = "you are more active on weekends";
                }

        return {
            mostActiveDay : mostActiveDay["day"],
            leastActiveDay : leastActiveDay["day"],
            general: activityString
        };
    }

    createData() {
        this.perDayViews = this.dayViews(this._csv);
        this.perWeekViews = this.weekViews(this.perDayViews);
        this.perMonthViews = this.monthViews(this.perDayViews);
        this.perYearViews = this.yearViews(this.perDayViews);
        this.minViews = this.minViews(this.perDayViews);
        this.maxViews = this.maxViews(this.perDayViews);
        this.totalViews = this.total(this.perDayViews);
        this.averageViews = this.averageViews(this.perDayViews);
        this.days = this.dayAverages(this.perDayViews);
        this.activity = this.activity(this.days);
    }

    get data() {
        return [
            this.dayViews,
            this.weekViews,
            this.monthViews,
            this.yearViews,
            this.minViews,
            this.maxViews,
            this.totalViews,
            this.averageViews,
            this.days,
            this.activity
        ]
    }
}