$(document).ready(function() { //when the document is ready...

    /* close popin */
    $('#popin-btn-close').click(

        function(event){

            $('#layer-popin').fadeOut();
            $('.popin').fadeOut();

            event.preventDefault();

        }
    )


});