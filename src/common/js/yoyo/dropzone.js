/*

    DropZone : 

    Dessine la dropZone, et le faisceau lumineux indiquant la proxitmité du Yoyo

    Vitesse de l'objet 'light' : Dans l'objet StartYoyo ( start.js )

    On récupère la position Y du Yoyo en l'état de 'drag'. 
    On calcule la difference entre cette position et la position de la dropZone.

    Plus cette difference se rapproche de 0, plus la vitesse du faisceau augmente.


*/


// Instance of the new Object : DropZone
var DropZone = function(imagesDropZone, myYoyo, dropZonePosY, lightSpeed, start, fade){

    // Canvas & Context
    this.layerDropZone  = document.querySelector('#layer-dropzone');
    this.ctxDropZone = this.layerDropZone.getContext('2d');

    // Canvas & Context
    this.layerDropZoneArrow  = document.querySelector('#layer-dropzone-arrow');
    this.ctxDropZoneArrow = this.layerDropZoneArrow.getContext('2d');

    // Arg

    this.myYoyo = myYoyo;                               // Objet Yoyo
   
    this.imagesYoyo = imagesDropZone;                   // Images loaded 

    this.dropZonePosY = dropZonePosY;                   // DropZone Y Position

    this.lightSpeed = lightSpeed;                       // Light Speed

    this.start = start;                                 // Start Yoyo

    this.fade = fade;                                    // fadeIn fadeOut

    // Objet dropZone
    this.dropZone = {
        x : this.layerDropZone.width/2  - 106.5,        // X Position (213 : dropZone.width)
        y : this.dropZonePosY                           // DropZone Y Position 
    };


    // Objet dropZoneTxt
    this.dropZoneTxt = {
        x : this.layerDropZone.width/2  - 90.5,         // X Position (181 : dropZoneTxt.width)
        y : this.dropZonePosY + 40                      // DropZone Y Position                   
    };

    // Objet Light
    this.dropLight = {
        x : this.layerDropZone.width/2,                 // X Position 
        y : this.dropZonePosY + 105,                    // Y Position  + dropZone.height/2 (dropZone.height = 248)                  
        periodRotation : 2826                          // Rotation Period
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
DropZone.prototype.clear = function(){

    this.ctxDropZone.clearRect(0, 0, this.layerDropZone.width, this.layerDropZone.height);
    this.ctxDropZoneArrow.clearRect(0, 0, this.layerDropZoneArrow.width, this.layerDropZoneArrow.height);

}


// Update
DropZone.prototype.update= function(){



    // Factors for a Periodic Variation
    this.time = (new Date()).getTime();
    this.timeDiff = this.time - this.startTime; 
    this.theta = 0;
    this.theta += this.timeDiff/2000 ;

    

    /*
        FadeIn, FadeOut
    */

    if(this.fade == 'inOut'){

        this.opacity = Math.sin(this.theta);
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
    this.dropLightRotate = this.lightSpeed * (this.timeDiff * (2 * Math.PI) / this.dropLight.periodRotation);  

}



// Draw DropZone
DropZone.prototype.drawDropZone = function(){
 
    var dropZone = this.imagesYoyo.dropZone;

    // Draw
    this.ctxDropZone.drawImage(dropZone, this.dropZone.x, this.dropZone.y, dropZone.width, dropZone.height);        

}




// Draw DropZoneTxt
DropZone.prototype.drawDropZoneTxt = function(){
 
    var dropZoneTxt = this.imagesYoyo.dropZoneTxt;

    this.ctxDropZone.drawImage(dropZoneTxt, this.dropZoneTxt.x, this.dropZoneTxt.y, dropZoneTxt.width, dropZoneTxt.height);        

}



// Draw Light
DropZone.prototype.drawDropLight = function(){
 
    var dropLight = this.imagesYoyo.dropLight;

    // Save
     this.ctxDropZone.save();

    // Translate
     this.ctxDropZone.translate(this.dropLight.x, this.dropLight.y);

    // Rotate
    this.ctxDropZone.rotate(this.dropLightRotate);

    // Draw
    this.ctxDropZone.drawImage(dropLight, -dropLight.width/2, -dropLight.height/2, dropLight.width, dropLight.height);        

    // restore
    this.ctxDropZone.restore();

}



// Draw DropZone Arrow
DropZone.prototype.drawDropZoneArrow = function(){
 
    var dropZoneArrow = this.imagesYoyo.dropZoneArrow;

    this.ctxDropZoneArrow.drawImage(dropZoneArrow, 0, 0, dropZoneArrow.width, dropZoneArrow.height);        

}


//  Animation
DropZone.prototype.animate = function(){

    var that = this;
    // Anim

    this.clear()
    this.update();

    // Opacity
    this.ctxDropZone.globalAlpha = this.opacity;
    this.ctxDropZoneArrow.globalAlpha = this.opacity;

    this.drawDropZone();

    this.drawDropZoneTxt();
    this.drawDropLight();

    this.drawDropZoneArrow()

    // request new frame
    var anim = requestAnimationFrame(function() {
        that.animate();
    });   

    // Cancel Animation Frame, when start yoyo in (start.js)
    if(this.start === true){
        cancelAnimationFrame(anim);
    }

    
}

