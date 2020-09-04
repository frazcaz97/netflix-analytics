const styleSheets = document.styleSheets[0];
let isHomePage = true;
let isAnalyticsPage = false;

const transition = () => {
    if (isHomePage) {
        styleSheets.insertRule("#screen-animation {position: absolute; z-index: 100; top: 0%; left: 0%; right: 0%; bottom: 0%; max-width: 100%; max-height: 100%; width: 100%; height: 100%; background: #e50914; animation: wipe-left 3s ease-in-out;}",0);
    } else {
        styleSheets.insertRule("#screen-animation {position: absolute; z-index: 100; top: 0%; left: 0%; right: 0%; bottom: 0%; max-width: 100%; max-height: 100%; width: 100%; height: 100%; background: #e50914; animation: wipe-right 3s ease-in-out;}",0);
    }
    setTimeout(runTransition, 1500);
    setTimeout(removeTransition, 2990);
}

const runTransition = () => {
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

const removeTransition = () => {
    styleSheets.removeRule(0);
}