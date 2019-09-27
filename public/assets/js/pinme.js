

var myNav = document.getElementById('mynav');
console.log(myNav);

window.onscroll = function () { 
    "use strict";
    console.log("scroll", document.documentElement.scrollTop);

    if (document.documentElement.scrollTop >= 100 ) {
    	$(myNav).show();
    	$("#logo").attr("src", "assets/images/logo2.png");

        // $(myNav).removeClass("uk-navbar-transparent");
    } 
    else if (document.documentElement.scrollTop >= 10 ) {
    	$(myNav).hide();
        $(myNav).removeClass("uk-navbar-transparent");
    } 

    else if (document.documentElement.scrollTop < 10) {
    	$(myNav).show();
    	$("#logo").attr("src", "assets/images/logo.png");

        $(myNav).addClass("uk-navbar-transparent");

    }
};