/*

    Controller : 

        Intialise l'objet DragYoyo
        Dessine le bouton PlayAgain    

        Gère l'interaction PlayAgain, permettant de relancer l'animation startYoyo via l'objet Navigation (navigation.js)

*/

// Instance of the new Object : Interaction
var Controller = function(imagesYoyo, myYoyo){

    this.imagesYoyo = imagesYoyo;                   // Images Yoyo
    this.myYoyo = myYoyo;                            // Object myYoyo
    
    /* Init Navigation */
    this.initNavigation = new Navigation(this.imagesShapes, this.myYoyo, this.coo, this.sequence1, this.sequence2, this.sequence3, this.initCollision, this.initSmoke)

    // btn PlayAgain
    this.initPlayAgain();     

}


// PlayAgain
Controller.prototype.initPlayAgain = function(){

    var that = this;

    /* Interaction PlayAgain */

    var layerPlayAgain = document.getElementById('play-again');

    // Click
    addEvent(layerPlayAgain, 'mousedown', function(evt){

        // actual vertical scroll position
        var actual_posY = (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);

        /* PlayAgain  */

        // init Nav
        that.initNavigation.stop(actual_posY);


        /* check State */
        function checkState(){

            if(that.myYoyo.getState() !== 'stop'){

                // request new frame
                requestAnimationFrame(function() {
                    checkState()
                });

            }
            
            else {

                // Show Canvas layer_Starter
                $('#layer-starter').show();
                // Hide Canvas layer_Engine
                $('#layer-engine').hide();

                // Show Canvas layer_RollZone
                $('#layer-rollzone').fadeIn(1000);
                // Show Canvas layer_DropZone
                $('#layer-dropzone').fadeIn(1000);
                // Show Canvas layer_RollZone
                $('#layer-rollzone-arrow').fadeIn(1000);
                // Show Canvas layer_DropZone
                $('#layer-dropzone-arrow').fadeIn(1000);

            }

        }

        checkState();
  

    })

}






