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
    //fordi det er 30 dager uansett måned, gå gjennom 30 ganger
    let x = 10;
    let y = 10;
    for (let i = 0;i < 30;i++) {
        kalenderElement.appendChild(lagKalenderDag(x, y));
        kalenderElement.appendChild(lagKalenderDagTekst(x+10,y+20,i+1));
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

function lagKalenderDagTemperatur(x,y,i) {
    //ta 4 numre fra hver dag, med 9 tall mellom seg
    //og finn gjennomsnitt, sett deretter som tall
    console.log("hei");
}