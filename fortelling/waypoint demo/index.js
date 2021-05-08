$(function() {  

let articleScrollPercentageElement = $("#scroll__percent");
let fortellingTekstScroll = $(".fortelling__tekst__scroll");

let isScrolling;

fortellingTekstScroll.on("scroll", fixArticlePercentage);

function fixArticlePercentage() {
    window.clearTimeout(isScrolling);

    //https://gomakethings.com/detecting-when-a-visitor-has-stopped-scrolling-with-vanilla-javascript/
	isScrolling = setTimeout(function() {
        let heightWithoutViewport = fortellingTekstScroll[0].scrollHeight - fortellingTekstScroll[0].clientHeight;
        let percent = (fortellingTekstScroll[0].scrollTop / heightWithoutViewport)*100;
        articleScrollPercentageElement.css("width", (percent + "%"))
    }, 30);
}

});