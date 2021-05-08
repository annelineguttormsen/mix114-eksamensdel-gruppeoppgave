$(function() {  

let articleScrollPercentageElement = $("#scroll__percent");
let fortellingTekstScroll = $(".fortelling__tekst__scroll");

let isScrolling;
let currentPic = 0;
let waypoints = document.getElementsByClassName("fortelling__section");
let waypointCoordinates = new Array();

for (let i=0;i<waypoints.length;i++) {
  //få y attribute til waypoints (fra rect), legg til scrolltop i tilfelle 
  //dokumentet lastes inn mens fortellingstekstscroll allerede er scrollet
  let rect = waypoints[i].getBoundingClientRect().y + fortellingTekstScroll[0].scrollTop;
  waypointCoordinates.push(rect);
}

console.log(waypointCoordinates);

fortellingTekstScroll.on("scroll", fixArticlePercentage);

function fixArticlePercentage() {
  window.clearTimeout(isScrolling);

  //denne delen av funksjonen må "throttles"
  //ellers vil performance bli forferdelig for bruker
  //https://gomakethings.com/detecting-when-a-visitor-has-stopped-scrolling-with-vanilla-javascript/
	isScrolling = setTimeout(function() {
    //regn ut hvor langt i prosent bruker er i historien
    //sett lengden på linjen øverst med prosent
    let heightWithoutViewport = fortellingTekstScroll[0].scrollHeight - fortellingTekstScroll[0].clientHeight;
    let percent = (fortellingTekstScroll[0].scrollTop / heightWithoutViewport)*100;
    articleScrollPercentageElement.css("width", (percent + "%"));

    //finn ut om bruker har kommet til "spesifikk" paragraf
    //deretter oppdater bilde hvis det ikke er currentPic
    if (fortellingTekstScroll[0].scrollTop >= 0 && fortellingTekstScroll[0].scrollTop < waypointCoordinates[0]) {
      console.log("bilde nr 1");
    }
    else if (fortellingTekstScroll[0].scrollTop > waypointCoordinates[0] && fortellingTekstScroll[0].scrollTop < waypointCoordinates[1]) {
      console.log("bilde nr 2");
    }
    console.log(fortellingTekstScroll[0].scrollTop);

  }, 30);
}

});