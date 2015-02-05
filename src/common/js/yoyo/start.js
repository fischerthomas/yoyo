/*

    StartYoyo : 

    Gère l'évenement Drag n Drop du Yoyo
    Gère l'évenement Roll-Up
    Gère l'évenement Click

    Pour chaque évenement, on vérifie grace à la function protoype update de l'objet Yoyo (engine.js), 
    si le yoyo a atteint sa rotation ou sa descente maximale, avant d'afficher le menu pour pouvoir interragir.


    PlayAgain :
    Gère l'évenement permettant de redemarrer le Start Yoyo (PlayAgain est directement lié au initPlayAgain (dans controller.js))

*/

// Instance of the new Object : Interaction
var StartYoyo = function(imagesYoyo, yoyoPosY, myYoyo, animYoyo){

    /* Start Yoyo */


    // Args
    this.imagesYoyo = imagesYoyo;               // All Images
    this.yoyoPosY = yoyoPosY;                   // Yoyo start Position  
    this.myYoyo = myYoyo;                       // Object Yoyo
    this.animYoyo = animYoyo;                   // function anim Yoyo

    // Images
    this.yoyoImg = this.imagesYoyo.yoyo;
    this.ropeImg = this.imagesYoyo.rope;


    // Call by events.js
    this.events = new Events("layer-starter");
    this.canvas = this.events.getCanvas();
    this.context = this.events.getContext();


    // Images Variables 
    this.YoyorectX = this.canvas.width / 2 - this.yoyoImg.width / 2;
    this.YoyorectY = this.yoyoPosY;
    this.RoperectX = this.canvas.width / 2;
    this.RoperectY = this.yoyoPosY;
    this.rotation;

    // Init drag
    this.draggingRectYoyo = false;                  
    this.draggingRectOffsetX = 0;
    this.draggingRectOffsetY = 0;              


    this.dropZonePosY = this.rollZonePosY = 500; // DropZone & RollZone Position 

    this.bezierControl1 = {
        x : this.RoperectX,                     // X bezier Control 1 
        y : 100                                 // Y bezier Control 1 
    }

    this.bezierControl2 = {
        x : this.RoperectX,                     // X bezier Control 2 
        y : 300                                 // Y bezier Control 2 
    }



    // Start Options DropZone RollZone

    this.lightAngle = 0;                        // Light Angle RollZone
    this.lightSpeed = 1;                        // Light Speed DropZone
    this.fade = 'inOut';                        // fadeIn fadeOut

    this.start = false;                         // Start Yoyo




    // init Start Yoyo
    this.initStart();


}


// Start Yoyo
StartYoyo.prototype.initStart = function(){
    
    var that = this;

    this.start = false;



    /* Drop Zone */

    // Instanciation     
    this.animDropZone = new DropZone(this.imagesYoyo, this.myYoyo, this.dropZonePosY, this.lightSpeed, this.start, this.fade);



    /* Roll Zone */

    // add a delay to avoid bug: dropzone and rollzone at the same time
    setTimeout(function(){

        // Instanciation     
        that.animRollZone = new RollZone(that.imagesYoyo, that.myYoyo, that.rollZonePosY, that.lightAngle, that.start, that.fade);

    }, 1000);


    // Yoyo start Position  
    var myYoyoposY = this.yoyoPosY

    var that = this;


    // Drag
    this.events.setStage(function(){

        
        // Reset Pos
        that.YoyorectY = that.yoyoPosY;
        that.RoperectY = that.yoyoPosY;
        that.bezierControl1.x = that.RoperectX;
        that.bezierControl2.x = that.RoperectX;
        that.rotation = 0

        var action; // pull or roll-up
        var direction; //
        // down or up - for the fadeIn fadeOut ctx
        var mouseDirection1, mouseDirection2;


        var mousePos = this.getMousePos();
        var mousePos2 = this.getMousePos2();


        if (that.draggingRectYoyo) {

            // mouseDirection
            mouseDirection1 = mousePos.y;
            mouseDirection2 = mousePos2.y;



            // if the diff < 0 we roll-up the Yoyo else we pull it
            var diffMouseDirection = mouseDirection1 - mouseDirection2

            // if pull
            if(diffMouseDirection > 0){

                // Show Context layer_DropZone
                that.animDropZone.fade = 'in'
                // Hide Context layer_RollZone
                that.animRollZone.fade = 'out'

                
            }
            // if rollUp
            else if(diffMouseDirection < 0){
              // Hide Context layer_DropZone
                that.animDropZone.fade = 'out'
                // Show Context layer_RollZone
                that.animRollZone.fade = 'in'


            }
            // if Static
            else{

            }




            // If we pull the Yoyo
            if(
                ((mousePos.y - that.draggingYoyoRectOffsetY) < (that.dropZonePosY) 
                && 
                ((mousePos.y - that.draggingYoyoRectOffsetY) > myYoyoposY))  // contraintes hautes et basses
                ){
                
                action = 'pull';



                // Update Yoyo

                //YoyorectX = mousePos.x - draggingYoyoRectOffsetY;
                that.YoyorectY = mousePos.y - that.draggingYoyoRectOffsetY;

                // Update Rope Oscill
                that.bezierControl1.x = (Math.sin(mousePos.y/10) * 2) + that.canvas.width / 2;
                that.bezierControl2.x = (Math.sin(mousePos.y/10) * -2) + that.canvas.width / 2;

                that.bezierControl1.y = that.RoperectY / 6; // 1/6 of Rope height
                that.bezierControl2.y = (that.RoperectY * 3) / 4; // 3/4 of Rope height


                // Update Rope Scale
                that.RoperectX = that.canvas.width / 2;
                that.RoperectY = mousePos.y - that.draggingRopeRectOffsetY;
            
                // DragYoyo Pos  
                that.animDropZone.dragYoyoPosY = that.YoyorectY


                /* Difference entre la position du dragging Yoyo et la zone de drop.
                Plus elle se rapproche de zero, plus la vitesse augmente. */
                var diffDragDrop = (that.dropZonePosY) - that.animDropZone.dragYoyoPosY;

                if((diffDragDrop > 250) && (diffDragDrop < 300)){

                    that.animDropZone.lightSpeed = 0.5

                }else if((diffDragDrop > 200) && (diffDragDrop < 250)){

                    that.animDropZone.lightSpeed = 2

                }else if((diffDragDrop > 150) && (diffDragDrop < 200)){

                    that.animDropZone.lightSpeed = 3.5

                }else if((diffDragDrop > 100) && (diffDragDrop < 150)){

                    that.animDropZone.lightSpeed = 5

                }else if((diffDragDrop > 50) && (diffDragDrop < 100)){

                    that.animDropZone.lightSpeed = 8

                }else if((diffDragDrop > 0) && (diffDragDrop < 50)){

                    that.animDropZone.lightSpeed = 11

                }
                else{
                     that.animDropZone.lightSpeed = 1.5

                }

            } 

            // If we pull the Yoyo over constraints
            else if(
                ((mousePos.y - that.draggingYoyoRectOffsetY) > (that.dropZonePosY) 
                && 
                ((mousePos.y - that.draggingYoyoRectOffsetY) > myYoyoposY))  // contraintes hautes et basses
                ){

  
                // Update Yoyo

                //YoyorectX = mousePos.x - draggingYoyoRectOffsetY;
                that.YoyorectY = mousePos.y - that.draggingYoyoRectOffsetY

                // Update Rope Oscill
                that.bezierControl1.x = (Math.sin(mousePos.y/10) * 2) + that.canvas.width / 2;
                that.bezierControl2.x = (Math.sin(mousePos.y/10) * -2) + that.canvas.width / 2;

                that.bezierControl1.y = that.RoperectY / 6; // 1/6 of Rope height
                that.bezierControl2.y = (that.RoperectY * 3) / 4; // 3/4 of Rope height


                // Update Rope Scale
                that.RoperectX = that.canvas.width / 2;
                that.RoperectY = mousePos.y - that.draggingRopeRectOffsetY;
            

                // DragYoyo Pos  
                that.animDropZone.dragYoyoPosY = that.YoyorectY


                /* Difference entre la position du dragging Yoyo et la zone de drop.
                Plus elle se rapproche de zero, plus la vitesse augmente. */
                var diffDragDrop = (that.dropZonePosY) - that.animDropZone.dragYoyoPosY;


                // Dépasse la dropZone
                if((diffDragDrop > -50) && (diffDragDrop < 0)){

                    that.animDropZone.lightSpeed = 11

                }else if((diffDragDrop > -100) && (diffDragDrop <  -50)){

                    that.animDropZone.lightSpeed = 8

                }else if((diffDragDrop > -150) && (diffDragDrop < -100)){

                    that.animDropZone.lightSpeed = 5

                }else if((diffDragDrop > -200) && (diffDragDrop < -150)){

                    that.animDropZone.lightSpeed = 3.5

                }else if((diffDragDrop > -250) && (diffDragDrop < -200)){

                    that.animDropZone.lightSpeed = 2

                }else if((diffDragDrop > -300) && (diffDragDrop < -250)){

                    that.animDropZone.lightSpeed = 1.5

                }

            }


            // If we Roll-up the Yoyo
            else if(
                ((mousePos.y - that.draggingYoyoRectOffsetY) < myYoyoposY) 
                && 
                ((mousePos.y - that.draggingYoyoRectOffsetY) > that.yoyoImg.height/3)  // contraintes hautes et basses
                ){

                action = 'rollUp';



                // Update Yoyo

                //YoyorectX = mousePos.x - draggingYoyoRectOffsetY;
                that.YoyorectY = mousePos.y - that.draggingYoyoRectOffsetY;

                // Update Rope Oscill
                that.bezierControl1.x = (Math.sin(mousePos.y/10) * 2) + that.canvas.width / 2;
                that.bezierControl2.x = (Math.sin(mousePos.y/10) * -2) + that.canvas.width / 2;

                that.bezierControl1.y = that.RoperectY / 6; // 1/6 of Rope height
                that.bezierControl2.y = (that.RoperectY * 3) / 4; // 3/4 of Rope height


                // Update Rope Scale
                that.RoperectX = that.canvas.width / 2;
                that.RoperectY = mousePos.y - that.draggingRopeRectOffsetY;
            
                // Rotation Yoyo 
                that.rotation = (Math.PI) + (mousePos.y) * 0.05

                /* Difference entre la position du dragging Yoyo et la zone min de RollUp.
                Plus elle se rapproche de zero, plus l'angle augmente. */
                var diffRollDrop = (mousePos.y - that.draggingYoyoRectOffsetY) - that.yoyoImg.height/3 ;
              
                // RollUpYoyo Angle  
                that.animRollZone.lightAngle = diffRollDrop * 2
            } 

            // If we Roll-up the Yoyo over constraints
            else if(
                ((mousePos.y - that.draggingYoyoRectOffsetY) < myYoyoposY) 
                && 
                ((mousePos.y - that.draggingYoyoRectOffsetY) < that.yoyoImg.height/3)  // contraintes hautes et basses
                ){

                action = 'rollUp';



                // Update Yoyo

                //YoyorectX = mousePos.x - draggingYoyoRectOffsetY;
                that.YoyorectY = that.yoyoImg.height/3;     // when the Yoyo stop rolling Up (see height constraint)

                // Update Rope Oscill
                that.bezierControl1.x = (Math.sin(mousePos.y/10) * 2) + that.canvas.width / 2;
                that.bezierControl2.x = (Math.sin(mousePos.y/10) * -2) + that.canvas.width / 2;

                that.bezierControl1.y = that.RoperectY / 6; // 1/6 of Rope height
                that.bezierControl2.y = (that.RoperectY * 3) / 4; // 3/4 of Rope height


                // Update Rope Scale
                that.RoperectX = that.canvas.width / 2;
                that.RoperectY = that.yoyoImg.height/2;
                 
                // Rotation Yoyo 
               // that.rotation = (Math.PI) + (mousePos.y) * 0.05

            }


            else{
                // empty
            }

        }

        if(action == 'pull'){

            // clear the canvas
            this.clear();

            // Draw Rope
            this.context.beginPath();
            this.context.moveTo(that.RoperectX, 0);
            this.context.bezierCurveTo(that.bezierControl1.x, that.bezierControl1.y, that.bezierControl2.x, that.bezierControl2.y, that.RoperectX, that.RoperectY);

            // Draw Pattern
            this.fillPattern = that.context.createPattern(that.ropeImg, 'repeat');

            this.context.lineWidth = 4;
            this.context.strokeStyle = this.fillPattern
            this.context.stroke();

            // Draw Yoyo                
            this.beginRegion();
            this.context.drawImage(that.yoyoImg, that.YoyorectX, that.YoyorectY, that.yoyoImg.width, that.yoyoImg.height);


  
            // draw rectangular region for image
            this.context.beginPath();
            this.context.rect(that.YoyorectX, that.YoyorectY, that.yoyoImg.width, that.yoyoImg.height);
            this.context.closePath();
             

        }else{

            // clear the canvas
            this.clear();
        

            /* Draw Rope */
            this.context.beginPath();
            this.context.moveTo(that.RoperectX, 0);

            this.context.bezierCurveTo(that.bezierControl1.x, that.bezierControl1.y, that.bezierControl2.x, that.bezierControl2.y, that.RoperectX, that.RoperectY);
            // Draw Pattern
            this.fillPattern = this.context.createPattern(that.ropeImg, 'repeat');

            this.context.lineWidth = 4;
            this.context.strokeStyle = this.fillPattern
            this.context.stroke();

            /* Draw Yoyo */               
            this.beginRegion();
        
            // Save
            this.context.save();

            // Translate
            this.context.translate((that.YoyorectX + that.yoyoImg.width/2), (that.YoyorectY + that.yoyoImg.height/2));

            // Rotate
            this.context.rotate(that.rotation);

            this.context.drawImage(that.yoyoImg, -that.yoyoImg.width/ 2, -that.yoyoImg.height / 2, that.yoyoImg.width, that.yoyoImg.height);
            
            // Restore
            this.context.restore();



            // draw rectangular region for image
            this.context.beginPath();
            this.context.rect(that.YoyorectX, that.YoyorectY, that.yoyoImg.width, that.yoyoImg.height);
            this.context.closePath();

        }


        // check when the Yoyo's Swinging
        function checkState(){

            if((that.myYoyo.getState() !== 'swing')){

                // request new frame
                requestAnimationFrame(function() {
                    checkState()
                });


            }else{


                //$('#layers-menu').fadeIn(2000);
                $('#play-again').fadeIn(2000);
                





            }
        }

            /* check setTimeout method replace check status*/
            /*
            // Show Canvas layers_Menu + Replay
            setTimeout(function(){

                $('#layers_Menu').fadeIn(2000);
                $('#layer_Replay').fadeIn(2000);

            }, 4000);
            */


         



         /*   Events   */   

        // Mouse Down
        this.addRegionEventListener("mousedown", function(){


            that.timerMousedown = new Date();                           // get time for checking click, or drag


            that.draggingRectYoyo = true;

            var mousePos = that.events.getMousePos();
                        
            that.draggingYoyoRectOffsetX = mousePos.x - that.YoyorectX;
            that.draggingYoyoRectOffsetY = mousePos.y - that.YoyorectY;
                        
            that.draggingRopeRectOffsetX = mousePos.x - that.RoperectX;
            that.draggingRopeRectOffsetY = mousePos.y - that.RoperectY;





            $('#layer-dropzone-arrow').fadeOut()
            $('#layer-rollzone-arrow').fadeOut()

        });


        // Mouse Up
        this.addRegionEventListener("mouseup", function(){
            

            // Check with timer if it's a click or a drag action
            that.timerMouseup = new Date();

            that.timerMousediff = that.timerMouseup - that.timerMousedown;

            
            // if Click 
            if(that.timerMousediff < 200){

                // anim Yoyo
                that.animYoyo('start', 1, that.YoyorectY);
                
                // check when show menu
                checkState()
               
                // Show Canvas layer_Engine
                $('#layer-engine').show();

                // Hide Canvas layer_Starter 
                $('#layer-starter').hide()


                that.draggingRectYoyo = false;


                /*
                // Init Options
                that.animDropZone.lightSpeed =  that.lightSpeed;
                that.animRollZone.lightSpeed =  that.lightAngle;
                that.animDropZone.fade =  that.fade;
                that.animRollZone.fade =  that.fade;
                */
            } 

            // if Drag
            else {
                
                // Instance Yoyo Object
                if(action === 'rollUp'){

                    // anim Yoyo
                   that.animYoyo('rollUp', 1, (that.YoyorectY));
                              
                    // check when show menu
                    checkState()


                }else{

                    // anim Yoyo
                    that.animYoyo('pull', -8, (that.YoyorectY - 265));

                    // check when show menu
                    checkState();

                }

                // Hide Canvas layer_Starter
                $('#layer-starter').hide()
                // Show Canvas layer_Engine
                $('#layer-engine').show();

                that.draggingRectYoyo = false;

                /*
                // Init Options
                that.animDropZone.lightSpeed =  that.lightSpeed;
                that.animRollZone.lightSpeed =  that.lightAngle;
                that.animDropZone.fade =  that.fade;
                that.animRollZone.fade =  that.fade;

                */

            }


                // Cancel Animation Frame, when start yoyo in (dropzone.js, rollzone.js)
                that.animRollZone.start= true;
                that.animDropZone.start = true;

                // Hide Canvas layer_RollZone
                $('#layer-rollzone').fadeOut(500)
                // Hide Canvas layer_DropZone
                $('#layer-dropzone').fadeOut(500)

                // cursor
                document.body.style.cursor = "default";

        });


        // Mouse Over
        this.addRegionEventListener("mouseover", function(){

            // cursor
            document.body.style.cursor = "url('./common/img/cursor.cur'), move";


        });

        // Mous Move
        this.addRegionEventListener("mousemove", function(){

           //document.body.style.cursor = "pointer";

            //this2.initShapes(mousePos.x, mousePos.y);
        });

        // Mouse Out
        this.addRegionEventListener("mouseout", function(){

        
            if (that.draggingRectYoyo) {


                // comme mouse Up

                
                // Instance Yoyo Object
                if(action === 'rollUp'){
                   
                    // anim Yoyo
                    that.animYoyo('rollUp', 1, (that.YoyorectY));
                
                    // check when show menu
                    checkState();



                }else{

                    // anim Yoyo
                    that.animYoyo('pull', -8, (that.YoyorectY - 265));

                    // check when show menu
                    checkState();

                }

                // Hide Canvas layer_Starter
                $('#layer-starter').hide()
                // Show Canvas layer_Engine
                $('#layer-engine').show();

                that.draggingRect = false;

                /*
                // Init Options
                that.animDropZone.lightSpeed =  that.lightSpeed;
                that.animRollZone.lightSpeed =  that.lightAngle;
                that.animDropZone.fade =  that.fade;
                that.animRollZone.fade =  that.fade;
                */
                
                // Hide Canvas layer_RollZone
                $('#layer-rollzone').fadeOut(500)
                // Hide Canvas layer_DropZone
                $('#layer-dropzone').fadeOut(500)

            }

            // cursor
            document.body.style.cursor = "default";

        });
                    

        this.closeRegion();   



    });







    var layerPlayAgain = document.getElementById('play-again')

    // Init Yoyo Rect when click on PlayAgain
    addEvent(layerPlayAgain, 'mousedown', function(evt){


        
        // Reset Pos
        that.YoyorectY = that.yoyoPosY;
        that.RoperectY = that.yoyoPosY;
        that.bezierControl1.x = that.RoperectX;
        that.bezierControl2.x = that.RoperectX;
        that.rotation = 0


        /* Init Options*/
        that.animDropZone.lightSpeed =  that.lightSpeed;
        that.animRollZone.lightAngle =  that.lightAngle;
        that.animDropZone.fade =  that.fade;
        that.animRollZone.fade =  that.fade;
        
        // Restart Animation Frame, when start yoyo in (dropzone.js, rollzone.js)
        that.animRollZone.start = false;
        that.animDropZone.start = false;
        that.animRollZone.animate();
        that.animDropZone.animate();


        // clear
        that.context.clearRect(0, 0, 224, 1200);
        

        /* Draw Rope */
        that.context.beginPath();
        that.context.moveTo(that.RoperectX, 0);

        that.context.bezierCurveTo(that.bezierControl1.x, that.bezierControl1.y, that.bezierControl2.x, that.bezierControl2.y, that.RoperectX, that.RoperectY);
        // Draw Pattern
        that.fillPattern = that.context.createPattern(that.ropeImg, 'repeat');

        that.context.lineWidth = 4;
        that.context.strokeStyle = that.fillPattern
        that.context.stroke();




        /* Draw Yoyo */

        // Save
        that.context.save();

        // Translate
        that.context.translate((that.YoyorectX + that.yoyoImg.width/2), (that.YoyorectY + that.yoyoImg.height/2));

        // Rotate
        that.context.rotate(that.rotation);

        that.context.drawImage(that.yoyoImg, -that.yoyoImg.width/ 2, -that.yoyoImg.height / 2, that.yoyoImg.width, that.yoyoImg.height);
            
        // Restore
        that.context.restore();



    })



}





