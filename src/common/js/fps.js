/*

    Test Fps : on test si fps < 20 alors on reteste au bout de 2 sec ( au cas ou ce soit une mauvaise interpretation)
    Si toujours < 20 on affiche une alerte.

    desactiver le test Fps quand on perd le focus de la fenetre.
*/

// Instance of the new Object : Yoyo
var Fps = function(){

    /* Fps */
    this.$fps  = document.getElementById('fps');
    this.askedVersion;                          // check if we have already aked for changing version

    //fps
    this.avgDelay = 0;
    this.lastDraw = new Date;   // Get Time

    this.animate();
    /* Fps */
    this.getFocus();                            // check if the window havethe focus ( for Fps )
    this.checkFps();                            // check Fps for alert popin
};





//  Animation
Fps.prototype.animate = function(){

    var that = this;


    // request new frame
    var anim = requestAnimationFrame(function() {
        that.animate();
    });   


    this.getFps();

}


// get FPS 
Fps.prototype.getFps = function(){

    //fps 
    this.now = new Date;
    this.delay = this.now - this.lastDraw;

    this.avgDelay += (this.delay - this.avgDelay) / 10;
    this.lastDraw = this.now;

    var fps = (1000/this.avgDelay).toFixed(1);

    return fps

}



// check Fps
Fps.prototype.checkFps = function(){

    var that = this

    this.intervalTimer = setInterval(function(){
            
        that.$fps.innerHTML = that.getFps() + " fps";

        if(that.getFps() < 30){
                    
            setTimeout(function(){
                        
                if(that.getFps() < 30){

                    setTimeout(function(){

                        if(that.getFps() < 30){
                            
                            showPopin();

                            that.askedVersion = true;

                            that.getFps = function(){

                                //fps 
                                return 100;

                            }
                            //clearInterval(that.intervalTimer)
                        }   
                                 
                    }, 2000)    
                }

            }, 2000)

        }
    }, 3000);


    // show popin
    function showPopin(){
        
        $('#layer-popin').fadeIn();
        $('.popin').fadeIn()
    }


}




// get Focus
Fps.prototype.getFocus = function(){

    var that = this;

    var onFocus = function() {
        
        // insert code to run when the window has focus.

        if(!that.askedVersion){

            that.getFps = function(){

                //fps 
                that.now = new Date;
                that.delay = that.now - that.lastDraw;

                that.avgDelay += (that.delay - that.avgDelay) / 10;
                that.lastDraw = that.now;

                var fps = (1000/this.avgDelay).toFixed(1);
                return fps

            }
            
        }else{
            // already ask
        }


        that.checkFps()


    };

    var onBlur = function() {

        // insert code to run when the window has lost focus.

        that.getFps = function(){

            //fps 
            return 100;

        }


        //clearInterval(that.intervalTimer)
    };



    if (document.onfocusin !== undefined) {

        var onfocusin = true;

    } else {

        var onfocusin = false;

    }

    if (onfocusin === true) {

        document.onfocusin = onFocus;
        document.onfocusout = onBlur;

    } else {

        window.onfocus = onFocus;
        window.onblur = onBlur;

    }


}

