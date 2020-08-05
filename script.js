let ingestFile = function() {

    const reader = new FileReader();
    const file = document.getElementById("uploadInput").files[0];

    if (!file.name.includes(".csv")) {
        alert("please upload a csv file");
    } else {
        reader.onload = function() {
            document.getElementById("output").innerHTML = reader.result;
        }
        reader.readAsText(file);
    }
}