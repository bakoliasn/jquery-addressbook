$(document).ready(function() {
    
    $('#last-col').pajinate({
        items_per_page : 3,
        nav_label_first : '<<',
					nav_label_last : '>>',
					nav_label_prev : '<',
					nav_label_next : '>'
    });
    
    $('.vert-line').each(function() {
        
        $(this).height($(this).next().height());

    });

});