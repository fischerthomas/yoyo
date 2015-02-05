/*

	Navigation : 

	Gère le PlayAgain via le menu (menu.js)

*/


// Instance of the new Object : Navigation
var Navigation = function(imagesShapes, myYoyo){

    /* Arg */
    this.myYoyo = myYoyo                        // Object myYoyo

}


// Stop    
Navigation.prototype.stop = function(){
    
    var that = this;

    that.myYoyo.process = 'normal';

    this.playAgain(that.myYoyo) 
                    
}

// PlayAgain Action
Navigation.prototype.playAgain = function(myYoyo){

    $('.on').removeClass('on')
    

    this.myYoyo.process = 'stop';
        
}



