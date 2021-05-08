$(function() {  

let articleScrollPercentageElement = $("#scroll__percent");
let fortellingTekstScroll = $(".fortelling__tekst__scroll");

articleScrollPercentageElement.css("width", "10%");

fortellingTekstScroll.on("scroll", fixArticlePercentage);

function fixArticlePercentage() {
    console.log(fortellingTekstScroll[0].scrollTop);
    console.log(fortellingTekstScroll[0].scrollHeight);
    let heightWithoutViewport = fortellingTekstScroll[0].scrollHeight - fortellingTekstScroll[0].clientHeight;
    let percent = (fortellingTekstScroll[0].scrollTop / heightWithoutViewport)*100;
    console.log("Dette er prosenten, ", percent);
    articleScrollPercentageElement.css("width", (percent + "%"))
}

});