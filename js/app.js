// Set the API base url
var API_URL = "https://loopback-rest-api-demo-ziad-saab.c9.io/api";

// Get a reference to the <div id="app">. This is where we will output our stuff
var $app = $('#app');





// Data retrieval functions
function getAddressBooks() {
    return $.getJSON(API_URL + '/AddressBooks');
}

function getEntries(addressBookId) {
    return $.getJSON(API_URL + '/AddressBooks/' + addressBookId + '/entries');
}

function getEntry(addressBookId, entryId) {
    return $.getJSON(API_URL + '/AddressBooks/' + addressBookId + '/entries/' + entryId);
}

function getEntryPhone(entryId) {
    return $.getJSON(API_URL + '/Entries/' + entryId + '/phones');
}

function getEntryEmail(entryId) {
    return $.getJSON(API_URL + '/Entries/' + entryId + '/emails');
}

function getEntryAddress(entryId) {
    return $.getJSON(API_URL + '/Entries/' + entryId + '/addresses');
}
// End data retrieval functions




// Functions that display things on the screen (views)
function displayAddressBooksList() {
    getAddressBooks().then(
        function(addressBooks) {

            $('#first-col').prepend('<h2>Address Books List</h2>');
            addressBooks.forEach(function(ab) {
                $('#first-col .content').append('<article class="books" data-id=' + ab.id + ' >ID: ' + ab.id + ' Name: ' + ab.name + '</article>');
            });
        });
}

$(document).on('click', '.books', function() {
    $('.selected').toggleClass('selected');
    $(this).toggleClass('selected');
    var bookId = $(this).data('id');
    displayAddressBook(bookId);
});


function displayAddressBook(addressBookId) {
    getEntries(addressBookId).then(function(result) {
        $('#last-col .content').html('');
        $('#mid-col').html('<h2>People</h2><div class="content"></div><div class="page_navigation entries" id="pg-nav"></div>');
        console.log(result);
        result.forEach(function(ab) {
            $('#mid-col .content').append('<article class="people" data-id=' + ab.id + '>' + ab.lastName + ', ' + ab.firstName + '</article');
        });
    });
}

$(document).on('click', '.people', function() {
    $(this).siblings('.selected').toggleClass('selected');

    $(this).toggleClass('selected');
    var peopleId = $(this).data('id');
    displayEntry(peopleId);
});


function displayEntry(entryId) {
    $('#last-col').html('<h2>Entries</h2><div class="content"></div><div class="page_navigation entries" id="pg-nav"></div>');
    getEntryPhone(entryId).then(function(result) {
        result.forEach(function(ab) {
            $('#last-col .content').append('<article class="entries" data-id=' + ab.id + '>' + ab.phoneType + ': ' + ab.phoneNumber + '</article>');
        });
    });
    getEntryAddress(entryId).then(function(result) {
        result.forEach(function(ab) {
            $('#last-col .content').append('<article class="entries" data-id=' + ab.id + '><p>' + ab.type + '</p><p>' + ab.line1 + ' ' + ab.line2 + '</p><p>' + ab.city + ' ' + ab.state + ' ' + ab.country + '</p><p>' + ab.zip + '</p></article>');
        });
    });
    getEntryEmail(entryId).then(function(result) {
        result.forEach(function(ab) {
            $('#last-col .content').append('<article class="entries" data-id=' + ab.id + '>' + ab.type + ': ' + ab.email + '</article>');
        });
    });
}
// End functions that display views





// Start the app by displaying all the addressbooks
// NOTE: This line is very important! So far, our code has only defined functions! This line calls the
// function that displays the list of address books, effectively initializing our UI.
displayAddressBooksList();