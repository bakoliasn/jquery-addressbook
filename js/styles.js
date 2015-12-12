$(document).ready(function() {
    
    $('.vert-line').each(function() {
        
        $(this).height($(this).next().height());

    });

});