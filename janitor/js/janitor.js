

function Janitor($canvas, data) {
    "use strict";


    var requestAnimFrame = (function () {
        return window.requestAnimationFrame    ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    }());


    function render() {

    }


    (function theLoop() {
        render();


        requestAnimFrame(theLoop);
    }());





}