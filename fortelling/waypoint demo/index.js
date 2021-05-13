window.onload = function() {  

//elementer
let articleScrollPercentageElement = document.getElementById("scroll__percent");
let waypoints = document.getElementsByClassName("fortelling__section--waypoint");
let waypointBilder = document.getElementsByClassName("fortelling__svg");
let jumbotronElement = document.getElementById("jumbotron");
let startKnapp = document.getElementById("start_knapp");

let currentPic;
let isResizing;
let isScrolling;
let waypointCoordinates = new Array();

//bakgrunnsbilder
let skogBG;

//preload bakgrunnsbilder
if (document.images) {
  skogBG = new Image();

  skogBG.src = "media/skog.png";
}
document.body.style.background = "url(" + skogBG.src + ")no-repeat center fixed";

function regnUtCoordinates() {
  for (let i=0;i<waypoints.length;i++) {
    //få y attribute til waypoints (fra rect), legg til scrolltop i tilfelle 
    //dokumentet lastes inn mens fortellingstekstscroll allerede er scrollet
    let rect = waypoints[i].getBoundingClientRect();
    let rectTop = rect.top + window.scrollY;
    waypointCoordinates.push(rectTop);
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
  if (currentWindowYPos >= 0 && currentWindowYPos < waypointCoordinates[0]) {
    currentPic = 0;
  } else {
    for (let waypointsNumber = 0; waypointsNumber < waypointCoordinates.length; waypointsNumber++) {
      if (currentWindowYPos > waypointCoordinates[waypointsNumber] && currentWindowYPos < waypointCoordinates[waypointsNumber+1]) {
        currentPic = waypointsNumber + 1;
        break;
      }
    }
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

function removeJumbotron() {
  jumbotronElement.style.display = "none";
}

startKnapp.addEventListener("click", removeJumbotron);

regnUtCoordinates();
currentPictureNumber();
fortellingOnScroll();
waypointBilder[currentPic].style.opacity = "1";
}