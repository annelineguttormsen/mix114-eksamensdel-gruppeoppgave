let kalenderData = new Array();
const kalenderElement = document.getElementById("kalender__svg");

/*sted 9999, år 671, 4 (april), i JSON*/
fetch("https://trialmix.infomedia.uib.no/andregrader/9999/671/4/json")
.then(response => response.json())
.then((data) => {kalenderData = data; lagKalender()});

function createSVGElement(tag) {
    let ns = "http://www.w3.org/2000/svg";
    return document.createElementNS(ns,tag);
}

function lagKalender() {
    console.log("lagkalender");
    kalenderElement.appendChild(lagKalenderDag());
}

function lagKalenderDag() {
    console.log("lagkalenderdag");
    let rect = createSVGElement("rect");
    rect.setAttribute("height", "150");
    rect.setAttribute("width", "150");
    rect.setAttribute("fill", "lightblue");
    rect.setAttribute("y", 10);
    rect.setAttribute("x", 10);
    return rect
}