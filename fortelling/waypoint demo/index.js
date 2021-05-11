window.onload = function() {  

//elementer
let articleScrollPercentageElement = document.getElementById("scroll__percent");
let waypoints = document.getElementsByClassName("fortelling__section--waypoint");
let waypointBilder = document.getElementsByClassName("fortelling__svg");

let currentPic;
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

    let oldPic = currentPic;

    if (oldPic != currentPictureNumber()) {
      waypointBilder[oldPic].style.opacity = "0";
      waypointBilder[currentPictureNumber()].style.opacity = "1";
    }
  }, 20);
}

function currentPictureNumber() {
  let currentWindowYPos = window.scrollY + window.innerHeight;
  let returnValue;
  if (currentWindowYPos >= 0 && currentWindowYPos < waypointCoordinates[0].rectTop) {
    currentPic = 0;
  }
  else if (currentWindowYPos > waypointCoordinates[0].rectTop && currentWindowYPos < waypointCoordinates[1].rectTop) {
    currentPic = 1;
  }
  else if (currentWindowYPos > waypointCoordinates[1].rectTop && currentWindowYPos < waypointCoordinates[2].rectTop) {
    currentPic = 2;
  }
  else if (currentWindowYPos > waypointCoordinates[2].rectTop && currentWindowYPos < waypointCoordinates[3].rectTop) {
    currentPic = 3;
  }
  return currentPic;
}

window.addEventListener("resize", resizeCalculateCoords);

function resizeCalculateCoords() {
  //hvis bruker justerer på viewport, må posisjon
  //av bildene kalkuleres på nytt
  //også throttles det så klart
  window.clearTimeout(isResizing);

  isResizing = setTimeout(function() {
    waypointCoordinates = [];
    regnUtCoordinates();
  }, 30);
}

regnUtCoordinates();
currentPictureNumber();
fortellingOnScroll();
waypointBilder[currentPic].style.opacity = "1";
}