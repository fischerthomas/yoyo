var addEvent = function(element, type, callback){
    if (element.attachEvent) {
        element.attachEvent("on" + type, callback);
        addEvent = function(element, type, callback){
            element.attachEvent("on" + type, callback);
        }
    }
    else {
        element.addEventListener(type, callback, false);
        addEvent = function(element, type, callback){
            element.addEventListener(type, callback, false);
        }
    }
};
var removeEvent = function(element, type, callback){
    if (element.detachEvent) {
        element.detachEvent("on" + type, callback);
        removeEvent = function(element, type, callback){
            element.detachEvent("on" + type, callback);
        }
    }
    else {
        element.removeEventListener(type, callback, false);
        removeEvent = function(element, type, callback){
            element.removeEventListener(type, callback, false);
        }
    }
};


// Function requestAnimFrame Canvas

/*
window.requestAnimFrame = (function(){
            return window.requestAnimationFrame       || // La forme standardisée
                   window.webkitRequestAnimationFrame || // Pour Chrome et Safari
                   window.mozRequestAnimationFrame    || // Pour Firefox
                   window.oRequestAnimationFrame      || // Pour Opera
                   window.msRequestAnimationFrame     || // Pour Internet Explorer
                   function(callback){                   // Pour les élèves du dernier rang
                    window.setTimeout(callback, 1000 / 60);
                   };
               })();

*/
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating



// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());




// Function GetMousePos Canvas
function getMousePos(canvas, evt) {
        
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    }; 
}


