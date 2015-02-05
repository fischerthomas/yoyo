/*

    Loader : 

    On charge toutes les images nécessaires au Canvas pour le Yoyo

*/


// Instance of the new Object : Intro
var Loader = function(){


    // Images Sources                   1 items
    this.imagesSourcesBg = {

        bg :  './common/img/bg/bg.jpg'

    }
    

    // Images Sources           27 items
    this.imagesSourcesYoyo = {

        yoyo :  './common/img/yoyo/yoyo_d.png',
        rope : './common/img/yoyo/rope3.png',
        dropZone : './common/img/yoyo/dropzone/dropZone.png',
        dropZoneTxt : './common/img/yoyo/dropzone/dropZone_txt.png', 
        dropZoneArrow : './common/img/yoyo/dropzone/dropZone_arrow.png', 
        dropLight : './common/img/yoyo/dropzone/dropLight.png',
        rollZone : './common/img/yoyo/rollzone/rollZone.png', 
        rollZoneTxt : './common/img/yoyo/rollzone/rollZone_txt2.png', 
        rollZoneArrow : './common/img/yoyo/rollzone/rollZone_arrow.png', 
        rollLight : './common/img/yoyo/rollzone/rollLight.png',
        btn_replay :  './common/img/menu/btn_replay.png'
    };


    // Images loaded
    this.imagesBg = {};  
    this.imagesYoyo = {};        


    // total elements to load
    this.imagesYoyoLength = 11;

    this.totalLength = this.imagesYoyoLength;
    this.count = 0;

    // Initialization
    this.initCounter(this.count);
    this.initPreload(this.count);


}



// Percent
Loader.prototype.initCounter = function(count){

    if(count <= this.totalLength){

        document.getElementById('counter').innerHTML = ' '+((count/this.totalLength)*100).toFixed()+' % ';

        /* umbrella elements Rotate */
        function rotate(deg){

            return "rotate(" + (-180 + deg) + "deg)";

        }

        //call the bgPos function and change the umbrella elem position
        $('#rainbow').css({

            "-webkit-transform": rotate((count/this.totalLength)*180),
            "-moz-transform": rotate((count/this.totalLength)*180),
            "-o-transform": rotate((count/this.totalLength)*180),
            "-ms-transform": rotate((count/this.totalLength)*180),
            "transform": rotate((count/this.totalLength)*180)

        })



    }else{
        //this.initLoad();
    }
}


// Percent
Loader.prototype.counter = function(count){

    this.initCounter(count)

}


// Load Images first
Loader.prototype.initPreload = function(count){
    
    this.loadImagesBg(count);

}





// Load Images Bg
Loader.prototype.loadImagesBg = function(counter){

    var that = this;

    var loadedImages = 0;
    var numImages = 0;

    for (var src in this.imagesSourcesBg) {
        numImages++;
    }
    for (var src in this.imagesSourcesBg) {
        this.imagesBg[src] = new Image();
        this.imagesBg[src].onload = function(){

            // add new loaded Images to total Images
            var count = loadedImages + counter;

            if (++loadedImages >= numImages) {
                
                // add new loaded Images to total Images
                var count = counter;

                // Initialization
                that.loadImagesYoyo(count) 

            }else{

                // count loadedImages
                that.counter(count);
            }
        };
        this.imagesBg[src].src = this.imagesSourcesBg[src];

    }

};





// Load Images Yoyo
Loader.prototype.loadImagesYoyo = function(counter){

    
    var that = this;
    
    var loadedImages = 0;
    var numImages = 0;
    for (var src in this.imagesSourcesYoyo) {
        numImages++;
    }
    for (var src in this.imagesSourcesYoyo) {
        this.imagesYoyo[src] = new Image();
        this.imagesYoyo[src].onload = function(){


            // add new loaded Images to total Images
            var count = loadedImages + counter;

            if (++loadedImages >= numImages) {

                // Init Intro 
                var intro = new Intro(that.imagesYoyo);

                // Init Test Fps 
                var testFps = new Fps();
                
                that.initLoad();

            }else{
                
                // count to 100%
                var count = that.totalLength;

                // count loadedImages
                that.counter(count);
            }
        };

        this.imagesYoyo[src].src = this.imagesSourcesYoyo[src];
    }
};








// Load Images first
Loader.prototype.initLoad = function(){

    setTimeout(function(){

        $('#loader').fadeOut(1000)

     }, 1000)


}






// On Load
addEvent(window, 'load', function(){

    // Hide Canvas layer_Replay
    $('#layer-replay').hide();

    var loader = new Loader();


});


