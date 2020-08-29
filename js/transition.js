let isHomePage = true;
let isAnalyticsPage = false;
let runTransition = () => { //test transition
    if (isHomePage) {
        document.getElementById("home-page").style.display = "none";
        document.getElementById("analytics-page").style.display = "inline";
    }
    if (isAnalyticsPage) {
        document.getElementById("home-page").style.display = "inline";
        document.getElementById("analytics-page").style.display = "none";
    }
    isHomePage = !isHomePage;
    isAnalyticsPage = !isAnalyticsPage; 

}