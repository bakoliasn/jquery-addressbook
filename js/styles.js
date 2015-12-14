// $(document).ready(function() {
//     $('.col-col').pajinate({
//         items_per_page: 3
//     });
//         // nav_label_first: '<<',
//         // nav_label_last: '>>',
//         // nav_label_prev: '<',
//         // nav_label_next: '>'

//     $('#mid-col').pajinate({
//         items_per_page: 3,
//         nav_label_first: '<<',
//         nav_label_last: '>>',
//         nav_label_prev: '<',
//         nav_label_next: '>'
//     });
//     $('#last-col').pajinate({
//         items_per_page: 3,
//         nav_label_first: '<<',
//         nav_label_last: '>>',
//         nav_label_prev: '<',
//         nav_label_next: '>'
//     });
// });

$(document).on('click', function() {
    $('.vert-line').each(function() {
        $(this).height($(this).prev().height());
    });
})
