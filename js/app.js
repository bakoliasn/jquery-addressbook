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









$(document).on('click', '#closeForm', function() {
    $('#form').hide();
});

//add addresss book!
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
    editAddressBook(temp, name);
});



//addPeople
function addPeople(info) {
    return $.post(API_URL + '/Entries', {

        firstName: info.firstName,
        lastName: info.lastName,
        birthday: info.birthday,
        addressBookId: $('#first-col .content .selected').data('id')

    });
}

$(document).on('click', '#addPeople', function() {
    if ($('#first-col .content .selected').data('id') > 0) {
        $('#form').html('<form id="addPeoples" class="bootstrap-frm"><i class="fa fa-times-circle fa-2x" id="closeForm"></i><label>Set First Name:</label><input type="text" name="firstName"><label>Set Last Name:</label><input type="text" name="lastName"><label>Set Birthday:</label><input type="text" name="birthday"><button type="submit" class="submitpeople" id="createP" >submit</button></form>').show();
    }
    else {
        console.log("no addressbook selected")
    }

});

$(document).on('submit', '#addPeoples', function(e) {
    e.preventDefault();
    var info = {
        firstName: $('#form form input[name="firstName"]').val(),
        lastName: $('#form form input[name="lastName"]').val(),
        birthday: $('#form form input[name="birthday"]').val()
    };
    console.log(info);
    addPeople(info);
    $('#form').hide('slow');
    location.reload();
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
        $('#mid-col').html('<h2>People<i class="addButton fa fa-plus-square-o" id="addPeople"></h2><div class="content"></div><div class="page_navigation" id="pg-nav"></div>');
        result.forEach(function(ab) {
            $('#mid-col .content').append('<article class="people" data-id=' + ab.id + '><i class="fa fa-pencil fa-2x" id="editP" data-id=' + ab.id + '></i><i class="fa fa-minus-square-o fa-2x" id="deleteP" data-id=' + ab.id + '></i>' + ab.lastName + ', ' + ab.firstName + '</article');
        });
    }).then(
        function() {
            $('#mid-col').pajinate({
                items_per_page: 3
            });
        });
}

$(document).on('click', '.people', function() {
    if ($(event.target).is('#editP') || $(event.target).is('#deleteAb')) {

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
    $('#last-col').html('<h2>Entries<i class="addButton fa fa-plus-square-o" id="addEntry"></h2><div class="content"></div><div class="page_navigation" id="pg-nav"></div>');

    getEntryPhone(entryId).then(function(result) {
        result.forEach(function(ab) {
            $('#last-col .content').append('<article class="entries phoneEntry" data-id=' + ab.id + '><i class="fa fa-pencil fa-2x" id="editAb" data-id=' + ab.id + '></i><i class="fa fa-minus-square-o fa-2x" id="deleteAb" data-id=' + ab.id + '></i>' + ab.phoneType + ': ' + ab.phoneNumber + '</article>');
        });

        return getEntryAddress(entryId);
    }).then(function(result) {

        result.forEach(function(ab) {
            $('#last-col .content').append('<article class="entries addressEntry" data-id=' + ab.id + '><i class="fa fa-pencil fa-2x" id="editAb" data-id=' + ab.id + '></i><i class="fa fa-minus-square-o fa-2x" id="deleteAb" data-id=' + ab.id + '></i><p>' + ab.type + '</p><p>' + ab.line1 + ' ' + ab.line2 + '</p><p>' + ab.city + ' ' + ab.state + ' ' + ab.country + '</p><p>' + ab.zip + '</p></article>');
        });

        return getEntryEmail(entryId);
    }).then(function(result) {

        result.forEach(function(ab) {
            $('#last-col .content').append('<article class="entries emailEntry" data-id=' + ab.id + '><i class="fa fa-pencil fa-2x" id="editAb" data-id=' + ab.id + '></i><i class="fa fa-minus-square-o fa-2x" id="deleteAb" data-id=' + ab.id + '></i>' + ab.type + ': ' + ab.email + '</article>');
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
