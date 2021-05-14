window.onload = function() {  

//elementer
let articleScrollPercentageElement = document.getElementById("scroll__percent");
let waypoints = document.getElementsByClassName("fortelling__section--waypoint");
let waypointsBackground = document.getElementsByClassName("fortelling__section--bg");
let dynamicBackgroundBilder = document.getElementsByClassName("dynamic__background__image");
let waypointBilder = document.getElementsByClassName("fortelling__svg");
let jumbotronElement = document.getElementById("jumbotron");
let startKnapp = document.getElementById("start_knapp");

let currentPic;
let currentBG;
let isResizing;
let isScrolling;
let waypointCoordinates = new Array();
let waypointBGCoordinates = new Array();

function regnUtCoordinates() {
  for (let i=0;i<waypoints.length;i++) {
    //få y attribute til waypoints (fra rect), legg til scrolltop i tilfelle 
    //dokumentet lastes inn mens fortellingstekstscroll allerede er scrollet
    let rect = waypoints[i].getBoundingClientRect();
    let rectTop = rect.top + window.scrollY;
    waypointCoordinates.push(rectTop);
  }
  for (let x=0;x<waypointsBackground.length;x++) {
    let rect = waypointsBackground[x].getBoundingClientRect();
    let rectTop = rect.top + window.scrollY;
    waypointBGCoordinates.push(rectTop);
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
    let oldBG = currentBG;

    if (oldPic != currentPictureNumber()) {
      waypointBilder[oldPic].style.opacity = "0";
      waypointBilder[currentPictureNumber()].style.opacity = "1";
    }
    if (oldBG != currentBGNumber()) {
      dynamicBackgroundBilder[oldBG].style.opacity = "0";
      dynamicBackgroundBilder[currentBG].style.opacity = "1";
    }
  }, 20);
}


function currentPictureNumber() {
  let currentWindowYPos = window.scrollY + window.innerHeight;
  if (currentWindowYPos >= 0 && currentWindowYPos < waypointCoordinates[0]) {
    currentPic = 0;
  } else {
    for (let waypointsNumber = 0; waypointsNumber < waypointCoordinates.length-1; waypointsNumber++) {
      if (currentWindowYPos > waypointCoordinates[waypointsNumber] && currentWindowYPos < waypointCoordinates[waypointsNumber+1]) {
        currentPic = waypointsNumber + 1;
        break;
      } else {
        currentPic = waypointCoordinates.length-1;
      }
    }
  }
  return currentPic;
}
function currentBGNumber() {
  let currentWindowYPos = window.scrollY + window.innerHeight;
  if (currentWindowYPos >= 0 && currentWindowYPos < waypointBGCoordinates[0]) {
    currentBG = 0;
  } 
  else {
    for (let waypointsNumber = 0; waypointsNumber < waypointBGCoordinates.length-1; waypointsNumber++) {
      if (currentWindowYPos > waypointBGCoordinates[waypointsNumber] && currentWindowYPos < waypointBGCoordinates[waypointsNumber+1]) {
        currentBG = waypointsNumber + 1;
        break;
      }
      //hvis ingen er true, er bruker på slutten av siden
      else {
        currentBG = waypointBGCoordinates.length;
      }
    }
  }
  return currentBG;
}

window.addEventListener("resize", resizeCalculateCoords);

function resizeCalculateCoords() {
  //hvis bruker justerer på viewport, må posisjon
  //av bildene kalkuleres på nytt
  //også throttles det så klart
  window.clearTimeout(isResizing);

  isResizing = setTimeout(function() {
    waypointCoordinates = [];
    waypointBGCoordinates = [];
    regnUtCoordinates();
  }, 30);
}

function removeJumbotron() {
  jumbotronElement.style.display = "none";
}

startKnapp.addEventListener("click", removeJumbotron);

regnUtCoordinates();
currentPictureNumber();
currentBGNumber();
fortellingOnScroll();
waypointBilder[currentPic].style.opacity = "1";
dynamicBackgroundBilder[currentBG].style.opacity = "1";
}