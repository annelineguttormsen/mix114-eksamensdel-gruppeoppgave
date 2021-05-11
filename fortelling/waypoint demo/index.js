window.onload = function() {  

//elementer
let articleScrollPercentageElement = document.getElementById("scroll__percent");
let waypoints = document.getElementsByClassName("fortelling__section--waypoint");
let waypointBilder = document.getElementsByClassName("fortelling__bilde__section");

let isResizing;
let isScrolling;
let waypointCoordinates = new Array();

function regnUtCoordinates() {
  for (let i=0;i<waypoints.length;i++) {
    //få y attribute til waypoints (fra rect), legg til scrolltop i tilfelle 
    //dokumentet lastes inn mens fortellingstekstscroll allerede er scrollet
    let rect = waypoints[i].getBoundingClientRect();
    let rectTop = rect.top + window.scrollY;
    let rectBottom = rect.bottom + window.scrollY;
    waypointCoordinates.push({rectTop: rectTop, rectBottom: rectBottom});
  }

  //sett height på bildene til å korrespondere til hvor neste waypoint starter
  for (let pictureNumber = 0; pictureNumber<waypointCoordinates.length;pictureNumber++) {
    //første bildet tar bare lengden fram til neste waypoint
    //resten må regnes ut lengden basert på waypoints
    //sin top og bunn
    switch (pictureNumber) {
      case 0:
        waypointBilder[pictureNumber].style.height = waypointCoordinates[pictureNumber].rectTop + "px";
        break;
      default:
        waypointBilder[pictureNumber].style.height = waypointCoordinates[pictureNumber].rectTop - waypointCoordinates[pictureNumber-1].rectTop + "px";
    }
  }
}

window.addEventListener("scroll", fortellingOnScroll);

function fortellingOnScroll() {
  window.clearTimeout(isScrolling);

  //denne delen av funksjonen må "throttles"
  //ellers vil performance bli forferdelig for bruker
  //https://gomakethings.com/detecting-when-a-visitor-has-stopped-scrolling-with-vanilla-javascript/
	isScrolling = setTimeout(function() {
    //regn ut hvor langt i prosent bruker er i historien
    //sett lengden på linjen øverst med prosent
    let heightWithoutViewport = document.body.scrollHeight - document.body.clientHeight;
    let percent = (window.scrollY / heightWithoutViewport)*100;
    articleScrollPercentageElement.style.width = (percent + "%");
  }, 20);
}

window.addEventListener("resize", resizeCalculateCoords);

function resizeCalculateCoords() {
  //hvis bruker justerer på viewport, må posisjon
  //av bildene kalkuleres på nytt
  //også throttles det så klart
  window.clearTimeout(isResizing);

  isResizing = setTimeout(function() {
    console.log("resize");
    waypointCoordinates = [];
    regnUtCoordinates();
  }, 30);
}

regnUtCoordinates();
fortellingOnScroll();
}