

var myNav = document.getElementById('mynav');
console.log(myNav);

window.onscroll = function () { 
    "use strict";
    console.log("scroll", document.documentElement.scrollTop);

    if (document.documentElement.scrollTop >= 100 ) {
    	$(myNav).show();
        // $(myNav).removeClass("uk-navbar-transparent");
    } 
    else if (document.documentElement.scrollTop >= 10 ) {
    	$(myNav).hide();
        $(myNav).removeClass("uk-navbar-transparent");
    } 

    else if (document.documentElement.scrollTop < 10) {
    	$(myNav).show();
        $(myNav).addClass("uk-navbar-transparent");
    }
};