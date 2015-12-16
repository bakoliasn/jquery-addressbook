$(document).on('click', function() {
    $('.vert-line').each(function() {
        $(this).height($(this).prev().height());
    });
})

$('#editMenu').toolbar({
    content: 'toolbar-options',
    position: 'right',
    animation: 'bounce',
    event: 'click'
});