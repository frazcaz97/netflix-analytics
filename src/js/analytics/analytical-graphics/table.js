export class Table {
    constructor(data) {
        
        const element = document.getElementById("table")
        const padding = Number(getComputedStyle(element).padding.substring(0, getComputedStyle(element).padding.length - 2));   //remove "px" from string and convert to number
        const width = element.clientWidth - padding;
        const height = element.clientHeight - padding;

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("id", "table-svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");

        console.log("width: ", width, " height: ", height);
        
        const card = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        card.setAttribute("style", "fill: #404040");
        card.setAttribute("x", 0);
        card.setAttribute("y", 0);
        card.setAttribute("width", width);
        card.setAttribute("height", height);
        card.setAttribute("rx", 15);

        svg.appendChild(card);
        document.getElementById("table").appendChild(svg);
    }
}