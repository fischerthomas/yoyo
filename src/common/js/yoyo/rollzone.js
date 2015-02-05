/*

    RollZone : 

    Dessine la rollZone, et le faisceau lumineux indiquant quand lacher le Yoyo

    Angle de l'objet 'light' :Dans l'objet StartYoyo ( start.js )

    On récupère la position Y du Yoyo en l'état de 'drag'. 
    On calcule la difference entre cette position et la position min du Roll-Up

    Plus cette difference se rapproche de 0, plus l'angle de rotation augmente


*/


// Instance of the new Object : DropZone
var RollZone = function(imagesRollZone, myYoyo, rollZonePosY, lightAngle, start, fade){

    // Canvas & Context
    this.layerRollZone  = document.querySelector('#layer-rollzone');
    this.ctxRollZone = this.layerRollZone.getContext('2d');

    // Canvas & Context
    this.layerRollZoneArrow  = document.querySelector('#layer-rollzone-arrow');
    this.ctxRollZoneArrow = this.layerRollZoneArrow.getContext('2d');

    // Arg

    this.myYoyo = myYoyo;                               // Objet Yoyo
   
    this.imagesYoyo = imagesRollZone;                   // Images loaded 

    this.rollZonePosY = rollZonePosY;                   // DropZone Y Position

    this.lightAngle = lightAngle;                       // Light Angle

    this.start = start;                                 // Start Yoyo

    this.fade = fade;                                   // fadeIn fadeOut

   
    // Objet rollZone
    this.rollZone = {
        x : this.layerRollZone.width/2  - 107,         // X Position (214 : rollZone.width)
        y : this.rollZonePosY                           // DropZone Y Position 
    };



    // Objet rollZoneTxt
    this.rollZoneTxt = {
        x : this.layerRollZone.width/2 - 88.5,          // X Position (177 : dropZoneTxt.width)
        y : this.rollZonePosY + 42                      // DropZone Y Position                   
    };

    // Objet Light
    this.rollLight = {
        x : this.layerRollZone.width/2,                 // X Position
        y : this.rollZonePosY + 107                     // Y Position  + rollZone /2 (rollZone = 214)                  
        
    };  


    this.startTime =  (new Date()).getTime();           // get Time


    // Options
    this.opacity = 1;                                   // context Opacity
    this.speedFade = 0.05                               // Fade speed
    this.fade = 'inOut'                                 // Fade In & Out


    // Initialisation
    this.animate();


}

// Clear context
RollZone.prototype.clear = function(){

    this.ctxRollZone.clearRect(0, 0, this.layerRollZone.width, this.layerRollZone.height);
    this.ctxRollZoneArrow.clearRect(0, 0, this.layerRollZoneArrow.width, this.layerRollZoneArrow.height);

}


// Update
RollZone.prototype.update= function(){


    // Factors for a Periodic Variation
    this.time = (new Date()).getTime();
    this.timeDiff = this.time - this.startTime; 
    this.theta = 0;
    this.theta += this.timeDiff/2000;

    
    /*
        FadeIn, FadeOut
    */


    if(this.fade == 'inOut'){

        this.opacity = Math.sin(-this.theta);
    }

    // fadeIn
    else if(this.fade == 'in'){

        if ( this.opacity < 1 ) {
            
            this.opacity = this.opacity + this.speedFade;

        } else{

            this.opacity = 1;

        }
        
    } 

    // fadeOut
    else if(this.fade == 'out'){
          
        if ( this.opacity  > 0 ) {
            
            this.opacity = this.opacity - this.speedFade;

        } else{

            this.opacity = 0;

        }

    } else{}


    /*
        Animation
    */

    // Light Rotation 
    this.rollLightRotate = this.lightAngle * (-Math.PI/180)

}


// Draw DropZone
RollZone.prototype.drawRollZone = function(){
 
    var rollZone = this.imagesYoyo.rollZone;

    // Draw
    this.ctxRollZone.drawImage(rollZone, this.rollZone.x, this.rollZone.y, rollZone.width, rollZone.height);        


}


// Draw Light
RollZone.prototype.drawRollLight = function(){
 
    var rollLight = this.imagesYoyo.rollLight;

    // Save
    this.ctxRollZone.save();

    // Translate
    this.ctxRollZone.translate(this.rollLight.x, this.rollLight.y);

    // Rotate
    this.ctxRollZone.rotate(this.rollLightRotate);

    // Draw
    this.ctxRollZone.drawImage(rollLight, -rollLight.width/2, -rollLight.height/2, rollLight.width, rollLight.height);        

    // restore
    this.ctxRollZone.restore();

}

// Draw RollZoneTxt
RollZone.prototype.drawRollZoneTxt = function(){
 
    var rollZoneTxt = this.imagesYoyo.rollZoneTxt;

    this.ctxRollZone.drawImage(rollZoneTxt, this.rollZoneTxt.x, this.rollZoneTxt.y, rollZoneTxt.width, rollZoneTxt.height);        

}

// Draw DropZone Arrow
RollZone.prototype.drawRollZoneArrow = function(){
 
    var rollZoneArrow = this.imagesYoyo.rollZoneArrow;

    this.ctxRollZoneArrow.drawImage(rollZoneArrow, 0, 0, rollZoneArrow.width, rollZoneArrow.height);        
}





//  Animation
RollZone.prototype.animate = function(){

    var that = this;

    // Anim

    this.clear()
    this.update();

    // Opacity
    this.ctxRollZone.globalAlpha = this.opacity;
    this.ctxRollZoneArrow.globalAlpha = this.opacity;

    this.drawRollZone();

    this.drawRollLight();
    this.drawRollZoneTxt();

    this.drawRollZoneArrow();

    // request new frame
    var anim = requestAnimationFrame(function() {
        that.animate();
    });    

    // Cancel Animation Frame, when start yoyo in (start.js)
    if(this.start === true){
        cancelAnimationFrame(anim);
    }




}

