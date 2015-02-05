/*

    Intro : 

    On charge toutes les images nécessaires au Canvas conncernant le Yoyo
    On initialise les objets : 

    -   DropZone (dropzone.js)
    -   RollZone (rollzone.js)


    on initialise l'objet Interaction (interaction.js)



*/


// Instance of the new Object : Intro
var Intro = function(imagesYoyo){


    // Canvas & Context
    this.layerYoyo  = document.querySelector('#layer-engine');

    /* Args */
    this.imagesYoyo = imagesYoyo;               // images Yoyo



    // Objet myYoyo
    this.myYoyo = {
        x : this.layerYoyo.width/2,            // X Position 
        y : 250 

    };

    // Initialization
    this.init();

}







Intro.prototype.init = function(){

	var that = this;

    

    // Mouse Over 
    addEvent(this.layerYoyo, 'mouseover', function(evt){
        
        //cursor
        document.body.style.cursor = "pointer";
     })



    // Mouse out 
    addEvent(this.layerYoyo, 'mouseout', function(evt){
            
        //cursor
        document.body.style.cursor = "default";

     })




    	
    var yoyo = that.imagesYoyo.yoyo;



    // Show Canvas layer_RollZone
    $('#layer-rollzone').fadeIn(1000)

    // Show Canvas layer_DropZone
    $('#layer-dropzone').fadeIn(1000)


    // Delay before start : Interaction
    setTimeout(function(){

        var playYoyo = new Interaction(that.imagesYoyo, that.myYoyo.y);

    }, 1000)




}




