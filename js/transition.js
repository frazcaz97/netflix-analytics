let isHomePage = true;
let isAnalyticsPage = false;
let runTransition = () => { //test transition
    if (isHomePage) {
        document.getElementById("home-page-container").style.display = "none";
        document.getElementById("analytics-page-container").style.display = "grid";
    }
    if (isAnalyticsPage) {
        document.getElementById("home-page-container").style.display = "grid";
        document.getElementById("analytics-page-container").style.display = "none";
    }
    isHomePage = !isHomePage;
    isAnalyticsPage = !isAnalyticsPage; 
}
//add animation css class to screen-animation