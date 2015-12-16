// Set the API base url
var API_URL = "https://loopback-rest-api-demo-ziad-saab.c9.io/api";

// Get a reference to the



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









//add addresss book!
$(document).on('click', '#closeForm', function() {
    $('#form').hide();
});


function addAddressBook(info) {
    return $.post(API_URL + '/AddressBooks', {
        "name": info
    });
}

$(document).on('click', '#addAddressBook', function() {
    $('#form').html('<form id="addAddressBooks" class="bootstrap-frm"><i class="fa fa-times-circle fa-2x" id="closeForm"></i><label>Set Address Book Name:</label><input type="text" name="addressBookName"><button type="submit" class="submitAddressBook" id="createAb" >submit</button></form>').show();
});

$(document).on('submit', '#addAddressBooks', function(e) {
    e.preventDefault();
    var name = $('#form form input[name="addressBookName"]').val();
    addAddressBook(name);
    $('#form').hide('slow');
    location.reload();
});










//delete address Book
$(document).on('click', '#deleteAb', function() {
    var id = $(this).data('id');
    var con = confirm('are you sure you want to delete addressbook# ' + id + '???');
    if (con) {
        deleteAddressBook(id);
    }
});

function deleteAddressBook(id) {
    return $.ajax({
        url: API_URL + "/AddressBooks/" + id,
        type: "DELETE",
        success: function() {
            location.reload();
        }
    });
}





//edit addressbook
function editAddressBook(id, name) {
    return $.ajax({
        url: API_URL + "/AddressBooks/" + id,
        type: 'PUT',
        success: function() {
            location.reload();
        },
        data: {
            name: name
        }
    });
}

$(document).on('click', '#editAb', function() {
    $('#form').html('<form id="editAddressBooks" class="bootstrap-frm"><i class="fa fa-times-circle fa-2x" id="closeForm"></i><label>Set Address Book Name:</label><input type="text" name=ABname><button type="submit" class="submitAddressBook" id="editAddressBook">submit</button></form>').show();
});

$(document).on('submit', '#editAddressBooks', function(e) {
    e.preventDefault();
    var temp = $('#first-col .selected').data('id');
    var name = $('#form form input[name="ABname"]').val();
    $('#form').hide('slow');
    console.log(temp + " " + name);
    editAddressBook(temp, name);
});

















// Functions that display things on the screen (views)
function displayAddressBooksList() {
    getAddressBooks().then(
        function(addressBooks) {

            $('#first-col').prepend('<h2>Address Books List<i class="addButton fa fa-plus-square-o" id="addAddressBook"></i></h2><div class="content"></div>');
            addressBooks.forEach(function(ab) {
                $('#first-col .content').append('<article class="books" data-id=' + ab.id + '><i class="fa fa-pencil fa-2x" id="editAb" data-id=' + ab.id + '></i><i class="fa fa-minus-square-o fa-2x" id="deleteAb" data-id=' + ab.id + '></i>ID: ' + ab.id + 'Name: ' + ab.name + ' </article>');
                // $('#editMenu').toolbar({
                //     content: 'toolbar-options',
                //     position: 'left',
                //     animation: 'bounce',
                //     event: 'click'
                // });
            });
        }).then(
        function() {
            $('#first-col').pajinate({
                items_per_page: 3
            });
        });
}

$(document).on('click', '.books', function() {
    if ($(event.target).is('#editAb') || $(event.target).is('#deleteAb')) {

    }
    else {
        $(this).siblings('.selected').toggleClass('selected');
        $(this).toggleClass('selected');
        var bookId = $(this).data('id');
        $('#mid-col .content').html('');
        $('#last-col .content').html('');
        $('#mid-col #pg-nav').html('');
        $('#last-col #pg-nav').html('');
        if ($(this).hasClass('selected')) {
            displayAddressBook(bookId);
        }
    }
});


function displayAddressBook(addressBookId) {
    getEntries(addressBookId).then(function(result) {
        $('#last-col .content').html('');
        $('#mid-col').html('<h2>People</h2><div class="content"></div><div class="page_navigation" id="pg-nav"></div>');
        result.forEach(function(ab) {
            $('#mid-col .content').append('<article class="people" data-id=' + ab.id + '><i class="fa fa-gear" id="editMenu" data-id=' + ab.id + '></i>' + ab.lastName + ', ' + ab.firstName + '</article');
        });
    }).then(
        function() {
            $('#mid-col').pajinate({
                items_per_page: 3
            });
        });
}

$(document).on('click', '.people', function() {
    if ($(event.target).is('#editAb') || $(event.target).is('#deleteAb')) {

    }
    else {
        $(this).siblings('.selected').toggleClass('selected');
        $(this).toggleClass('selected');
        var peopleId = $(this).data('id');
        console.log($('#last-col'));
        $('#last-col .content').html('');
        $('#last-col #pg-nav').html('');
        if ($(this).hasClass('selected')) {
            displayEntry(peopleId);
        }

    }
});





function displayEntry(entryId) {
    $('#last-col').html('<h2>Entries</h2><div class="content"></div><div class="page_navigation" id="pg-nav"></div>');

    getEntryPhone(entryId).then(function(result) {
        result.forEach(function(ab) {
            $('#last-col .content').append('<article class="entries" data-id=' + ab.id + '><i class="fa fa-gear" id="editMenu"></i>' + ab.phoneType + ': ' + ab.phoneNumber + '</article>');
        });

        return getEntryAddress(entryId);
    }).then(function(result) {

        result.forEach(function(ab) {
            $('#last-col .content').append('<article class="entries" data-id=' + ab.id + '><i class="fa fa-gear" id="editMenu"></i><p>' + ab.type + '</p><p>' + ab.line1 + ' ' + ab.line2 + '</p><p>' + ab.city + ' ' + ab.state + ' ' + ab.country + '</p><p>' + ab.zip + '</p></article>');
        });

        return getEntryEmail(entryId);
    }).then(function(result) {

        result.forEach(function(ab) {
            $('#last-col .content').append('<article class="entries" data-id=' + ab.id + '><i class="fa fa-gear" id="editMenu"></i>' + ab.type + ': ' + ab.email + '</article>');
        });

        $('#last-col').pajinate({
            items_per_page: 3
        });
    });
}








$(document).on('click', '.entries', function() {
    if ($(event.target).is('#editAb') || $(event.target).is('#deleteAb')) {

    }
    else {
        $(this).siblings('.selected').toggleClass('selected');
        $(this).toggleClass('selected');
    }
});
// End functions that display views





// Start the app by displaying all the addressbooks
// NOTE: This line is very important! So far, our code has only defined functions! This line calls the
// function that displays the list of address books, effectively initializing our UI.
displayAddressBooksList();
