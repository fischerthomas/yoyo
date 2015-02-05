/*

    Interaction : 

    Intialise l'objet startYoyo
    Intialise l'objet Engine Yoyo



*/

// Instance of the new Object : Interaction
var Interaction = function(imagesYoyo, yoyoPosY){

    /* Args */
    
    this.imagesYoyo = imagesYoyo;       // Images Yoyo
    this.yoyoPosY = yoyoPosY;           // récupere la position du yoyo intial 


    // Init Yoyo
    this.initYoyo();

    
    // Drag Yoyo
    this.startYoyo();        

}

// Init Yoyo
Interaction.prototype.initYoyo = function(){

    // Start Options
    this.process = '';
    this.throwDown = 30;
    this.options = {speedRotation:1, oscillRope:0};


    // Instanciation     
    this.myYoyo = new Yoyo(this.imagesYoyo, this.process, this.throwDown, this.options, this.posY, this.sens);

    //this.myYoyo.process = process;
    //this.myYoyo.throwDown = 30;
    //this.myYoyo.options = {speedRotation:0, oscillRope:0};

    // Init Menu
    var controller = new Controller(this.imagesYoyo, this.myYoyo);
    

}




// Drag Yoyo
Interaction.prototype.startYoyo = function(){

   this.startYoyo = new StartYoyo(this.imagesYoyo, this.yoyoPosY, this.myYoyo, this.animYoyo);
       
}


// Anim Yoyo
Interaction.prototype.animYoyo = function(process, sens, rectY){

    this.myYoyo.init(process, sens, rectY)

}









