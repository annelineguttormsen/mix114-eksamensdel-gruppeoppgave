let kalenderData = new Array();
const kalenderElement = document.getElementById("kalender__svg");
let inputNumber = document.getElementById("posisjon");


function initiate() {
    kalenderElement.innerHTML = "";
    let url = "https://trialmix.infomedia.uib.no/andregrader/";
    url = url + document.getElementById("posisjon").value + "/" + document.getElementById("aar").value + "/" + document.getElementById("maaned").value + "/json";
    console.log(url);
    fetch(url)
    .then(response => response.json())
    .then((data) => {kalenderData = Object.entries(data); lagKalender()});
}

function createSVGElement(tag) {
    let ns = "http://www.w3.org/2000/svg";
    return document.createElementNS(ns,tag);
}

function lagKalender() {
    //HERREGUUUUUUD man må grave
    console.log(kalenderData[0][1]);
    kalenderData = Object.entries(kalenderData[0][1]);
    kalenderData = kalenderData[0][1];
    console.log(kalenderData);
    //fordi det er 30 dager uansett måned, gå gjennom 30 ganger
    let x = 10;
    let y = 10;
    for (let i = 0;i < 30;i++) {
        //ta 4 numre fra hver dag, med 9 tall mellom seg
        //og finn gjennomsnitt, sett deretter som tall
        let gjennomsnittTemp = (kalenderData[i+1][8]) + (kalenderData[i+1][17]) + (kalenderData[i+1][26]) + (kalenderData[i+1][35]);
        gjennomsnittTemp = gjennomsnittTemp/4;
        kalenderElement.appendChild(lagKalenderDag(x, y));
        kalenderElement.appendChild(lagKalenderDagTekst(x+10,y+20,i+1));
        kalenderElement.appendChild(lagKalenderDagTemperatur(x+50,y+90,gjennomsnittTemp));
        if (i == 0) {
            x += 160;
            //% vil aktiveres på 0
        } else if ((i+1)%7 == 0) {
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
    rect.setAttribute("fill", "none");
    rect.setAttribute("stroke", "#575757");
    rect.setAttribute("stroke-width","1");
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    return rect
}

function lagKalenderDagTekst(x, y, dagnummer) {
    let text = createSVGElement("text");
    text.textContent = dagnummer;
    text.setAttribute("fill", "black");
    text.setAttribute("x",x);
    text.setAttribute("y",y);
    return text
}

function lagKalenderDagTemperatur(x,y,temperatur) {
    let text = createSVGElement("text");
    temperatur = parseInt(temperatur);
    text.textContent = temperatur + "°C";
    text.setAttribute("fill", "black");
    text.setAttribute("class", "temperatur");
    text.setAttribute("x",x);
    text.setAttribute("y",y);
    return text
}

function inputCheckNumber() {
    if (inputNumber.value.length > inputNumber.maxLength) {
        inputNumber.value = inputNumber.value.slice(0, inputNumber.maxLength)
    }
}

window.onload = function() {
    initiate();
}