/*

    basée sur formules trigonometrique: 
    cette équation admet des solutions de la forme : uC(t)=Um.cos(2π.t/T0+Φ0) où Um représente l’amplitude (en Volt), T0 , la période (en s) et Φ0, la phase à l’origine (en rad)
    source : http://lewebpedagogique.com/physique/oscillations-libres-dans-un-dipole-rlc-serie/
             http://www.cosmovisions.com/oscillation.htm

    Yoyo :

    Moteur d'animation du Yoyo.
    Interaction avec menu pour les états : 'drag', 'start', 'stop', 'normal', 'lower'
    non utilisé : ('normal' et 'lower' sont utilisé dans navigation.js, pour rendre le yoyo visible dans les sections diaporama)

    Controle et retourne pour l'objet start (start.js):
    - si le Yoyo est stoppé ou se balance (swinging)


    Controle et retourne pour l'objet Navigation (navigation.js): 
    si la direction du Yoyo est ascendante ou descendante


*/

// Instance of the new Object : Yoyo
var Yoyo = function(imagesYoyo, process, throwDown, options, posY, sens){


    // Canvas & Context
    this.layerYoyo  = document.querySelector('#layer-engine');
    this.ctxYoyo = this.layerYoyo.getContext('2d');

    // Arguments
    this.process = process;                      // Process
    this.throwDown = throwDown;                  // ThrowDown

    this.speedRotation = options.speedRotation;  // Rotation Speed 
    this.oscillRope = options.oscillRope;        // Oscillation amplitude

    this.posY = posY;                            // Position Y
    this.sens = sens;                            // Sens

    // Images loaded
    this.imagesYoyo = imagesYoyo;                       


    // Objet myYoyo
    this.myYoyo = {
        x : this.layerYoyo.width/2,              // X Position
        y : 250,//150                            // Y Position
        periodRotation : 2826                    // Rotation Period (- => faster  + => slower)

    };

    // Objet myRope
    this.myRope = {
        x : this.layerYoyo.width/2,              // X Position
        y : 0,                                   // Y Position
        amplitudeOscill :  1.5,                  // Oscillation Amplitude  (without => 0)
        frequencyOscill : 450,                   // Translation Frequency   (- => faster  + => slower)
        periodOscill : 100,                      // Oscillation Period
    };


    this.state = null;                          // check if yoyo is swinging or stop

    this.direction = null;                      // detemine the direction : up or down with check direction

    // Draw Pattern
    var rope = this.imagesYoyo.rope;
    this.fillPattern = this.ctxYoyo.createPattern(rope, 'repeat');


};



// Initialization
Yoyo.prototype.init = function(process, sens, rectY){


    // Arguments
    this.process = process;                     // process
    this.sens = sens;                           // sens

    // Start Options
    //this.posY = this.myYoyo.y;                // rectY
    this.throwDown = 30;                        // throwDown
    this.speedRotation = 1;                     // Rotation Speed 
    this.oscillRope = 0;                        // Oscillation amplitude

    // Time
    this.startTime =  (new Date()).getTime();   // Get Time


    // animate
    this.animate();

}



// Clear context
Yoyo.prototype.clear = function(){

    this.ctxYoyo.clearRect(0, 0, this.layerYoyo.width, this.layerYoyo.height);

}




// Update
Yoyo.prototype.update= function(){

    //this.gravity  = 1.3;
    this.gravity  = 0;


    // Factors for a Periodic Variation
    this.time = (new Date()).getTime();
    this.timeDiff = this.time - this.startTime; 
    this.theta = 0;
    this.theta += this.timeDiff/this.myRope.frequencyOscill;
    this.scale = (Math.sin(this.theta) + this.gravity);
    

    // Factors for a Pseudo-Periodic Variation
    var pulse = 0.01;
    var friction = 0.5;
    var velocity = 0.4; // 0.3 at start. Vitesse d'exectution

    // Acceleration
    var acceleration = this.throwDown * pulse;

    velocity += acceleration;
    velocity *= friction;

    var factorRotation = 0.07;
    /*
        Process
    */


    // Process pull
    if(this.process === 'pull'){

        if(this.sens < 1){

            this.sens += 0.10

        } else{
            this.sens = 1

            // Start throwDown
            this.throwDown += velocity

            if(this.throwDown > 150 ){
                this.throwDown = 150;

                // check if yoyo is swinging
                this.state = 'swing';
            }

            // Start speedRotation
            this.speedRotation += velocity * factorRotation;

            if(this.speedRotation > 10 ){
                this.speedRotation = 10
            }

            
            // Start Rope Vibration
            this.oscillRope+= 0.002

            if(this.oscillRope > 1 ){
                this.oscillRope = 1;

            }

        }

    }





    //  Process RollUp
    if(this.process === 'rollUp'){


        // Start throwDown
        this.throwDown += velocity + 150

        if(this.throwDown > 150 ){
            this.throwDown = 150;
        }


        // Start speedRotation
        this.speedRotation += velocity * factorRotation

        if(this.speedRotation > 10 ){
            this.speedRotation = 10;

            // check if yoyo is swinging (verif here cause throwdown is 150 at start)
            this.state = 'swing';
        }

        
        // Start Rope Vibration
        this.oscillRope+= 0.002

        if(this.oscillRope > 1 ){
            this.oscillRope = 1;

        }

    }





    // Process Start
    if(this.process === 'start'){

        // Start throwDown
        this.throwDown += velocity

        if(this.throwDown > 150 ){
            this.throwDown = 150;

            // check if yoyo is swinging
            this.state = 'swing';
        }

        // Start speedRotation
        this.speedRotation += velocity * factorRotation

        if(this.speedRotation > 10 ){
            this.speedRotation = 10;
        }

        
        // Start Rope Vibration
        this.oscillRope+= 0.002

        if(this.oscillRope > 1 ){
            this.oscillRope = 1;

        }

    }

    //  Process Stop
    if(this.process === 'stop'){

        //  Stop throwDown
        this.throwDown -= velocity
        
        if(this.throwDown < 0.5){
            this.throwDown = 0;

            // check if yoyo is stop
            this.state = 'stop';
        }

        
        //  Stop speedRotation
        this.speedRotation -= velocity * factorRotation;

        if(this.speedRotation < 0 ){
            this.speedRotation = 0;
        }


        // Stop Rope Vibration
        this.oscillRope -= 0.002

        if(this.oscillRope < 0 ){
            this.oscillRope = 0
        }

    }



    /*
    //  Process Lower
    if(this.process === 'lower'){


      //  Stop throwDown
        this.throwDown += velocity
        
        if(this.throwDown > 230){
            this.throwDown = 230;

        }

    }

    //  Process Lower
    if(this.process === 'normal'){


      //  Stop throwDown
        this.throwDown -= velocity
        
        if(this.throwDown < 150){
            this.throwDown = 150;

        }

    }
    */

    /*
        Animation
    */

    //  Rope Scale Y 
    this.ropeScale = this.sens * (this.scale*this.throwDown)+100;

    //  Rope Vibration 
    var ropeOscill = this.scale * this.myRope.amplitudeOscill 

    this.bezierControl1 = {
        x : this.oscillRope * ropeOscill * Math.sin(this.timeDiff * (2 * Math.PI) / this.myRope.periodOscill) + this.myRope.x,
        y : this.ropeScale / 4
    }


    this.bezierControl2 = {
        x :  this.oscillRope * -ropeOscill * Math.sin(this.timeDiff * (2 * Math.PI) / this.myRope.periodOscill) + this.myRope.x,
        y : (this.ropeScale * 3 )/ 4
    }



    // Yoyo Translation     
    this.yoyoTranslate = this.sens * this.scale * this.throwDown;  


    //  Yoyo Rotation 
    this.yoyoRotate = this.speedRotation * Math.sin(this.timeDiff * (2 * Math.PI) / this.myYoyo.periodRotation);  

}

// Yoyo state
Yoyo.prototype.getState = function(){

    // dépend du mouvement de départ du Yoyo ( fonction soit du throwdown , soit de la rotation)
    return this.state

}

// Yoyo Position
Yoyo.prototype.getPosition = function(){

/*  Résupère la position du Yoyo au 
    temps1 p1 et au temps2 p2
    if p2 - p1 > 0 => yoyo descend
                                    */
    return this.yoyoTranslate

}

// Draw String
Yoyo.prototype.drawString = function(){

    //var rope = this.imagesYoyo.rope;

    // Save
    this.ctxYoyo.save();


    // Draw
    this.ctxYoyo.beginPath();
    this.ctxYoyo.moveTo(this.myRope.x, this.myRope.y);
    this.ctxYoyo.bezierCurveTo(this.bezierControl1.x, this.bezierControl1.y, this.bezierControl2.x, this.bezierControl2.y, this.myRope.x, (this.ropeScale + this.myYoyo.y));


    // Draw Pattern
    //this.fillPattern = this.ctxYoyo.createPattern(rope, 'repeat');

    this.ctxYoyo.lineWidth = 4;
    this.ctxYoyo.strokeStyle = this.fillPattern
    this.ctxYoyo.stroke();

    // restore
    this.ctxYoyo.restore();

}

// Draw Yoyo
Yoyo.prototype.drawYoyo = function(){
 
    var yoyo = this.imagesYoyo.yoyo;



    // Save
    this.ctxYoyo.save();
    // Translate
    this.ctxYoyo.translate(this.myYoyo.x, (yoyo.height/2) + this.yoyoTranslate + this.myYoyo.y);

    // Rotate
    this.ctxYoyo.rotate(this.yoyoRotate);

    // Draw
    this.ctxYoyo.drawImage(yoyo, -yoyo.width/2, -yoyo.height/2, yoyo.width, yoyo.height);        

    // restore
    this.ctxYoyo.restore();

}





//  Animation
Yoyo.prototype.animate = function(){

    var that = this;

    // Anim
    this.t1 = this.getPosition();     // position au temps 1  

    this.clear()
    this.update();

    this.drawString();
    this.drawYoyo();

    this.t2 = this.getPosition();     // position au temps 2

    // request new frame
    var anim = requestAnimationFrame(function() {
        that.animate();
    });   

    // Cancel Animation Frame, when click yoyo in (intro.js)
    if(this.throwDown === 0){
        cancelAnimationFrame(anim);
    }



}





// get Direction (navigation.js)
Yoyo.prototype.getDirection = function(){

    var that = this

    /*
    // request new frame
    requestAnimationFrame(function() {
        that.getDirection();
    });   
    */

    // check if yoyo's going up or down for navigation.js
    if(this.t2 - this.t1 > 0){

        this.direction = 'down'
    }else {

        this.direction = 'up'
    }
    
    return this.direction
}

