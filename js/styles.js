$(document).on('click', function() {
    $('.vert-line').each(function() {
        $(this).height($(this).prev().height());
    });
})
