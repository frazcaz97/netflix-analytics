const styleSheets = document.styleSheets[0];
let isHomePage = true;
let isAnalyticsPage = false;

export const transition = () => {

    if (isHomePage) {
        styleSheets.insertRule("#screen-animation {position: absolute; z-index: 100; top: 0%; left: 0%; right: 0%; bottom: 0%; max-width: 100%; max-height: 100%; width: 100%; height: 100%; background: #e50914; animation: wipe-left 3s ease-in-out;}",0);
    } else {
        styleSheets.insertRule("#screen-animation {position: absolute; z-index: 100; top: 0%; left: 0%; right: 0%; bottom: 0%; max-width: 100%; max-height: 100%; width: 100%; height: 100%; background: #e50914; animation: wipe-right 3s ease-in-out;}",0);
    }

    const run = () => {
        if (isHomePage) {
            document.getElementById("main-title").style.display = "none";
            document.getElementById("home-page-container").style.display = "none";
            document.getElementById("analytics-page-container").style.display = "grid";
        }
        if (isAnalyticsPage) {
            document.getElementById("main-title").style.display = "block";
            document.getElementById("home-page-container").style.display = "grid";
            document.getElementById("analytics-page-container").style.display = "none";
            //reset the landing page display
            document.getElementById("file-name-field").style = "";
            document.getElementById("show-btn-home").style.display = "none";
        }

        isHomePage = !isHomePage;
        isAnalyticsPage = !isAnalyticsPage;
    }

    const remove = () => {
        styleSheets.removeRule(0);
    }

    setTimeout(run, 1500);
    setTimeout(remove, 2990);
}
