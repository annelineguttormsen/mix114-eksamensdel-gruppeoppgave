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
    //fordi det er 30 dager uansett måned, gå gjennom 30 ganger
    //oppdater y hver gang, reset på 7
    //oppdater x når 
    let x = 10;
    let y = 10;
    for (let i = 0;i <= 30;i++) {
        console.log("forløkke er på", i);
        kalenderElement.appendChild(lagKalenderDag(x, y));
        if (i == 0) {
            continue;
            //% vil aktiveres på 0
        }
        if (i % 7 == 0) {
            x = 10;
            y += 160;
        } else {
            x += 160;
        }
    }
}

function lagKalenderDag(x, y) {
    let rect = createSVGElement("rect");
    rect.setAttribute("height", "150");
    rect.setAttribute("width", "150");
    rect.setAttribute("fill", "lightblue");
    console.log("lagkalenderdag, x og y er ", x, y);
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    return rect
}