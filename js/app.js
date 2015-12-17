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
    console.log(info);
    console.log($('#first-col .content .selected').data('id'));
    return $.post(API_URL + '/Entries', {

        firstName: info.firstName,
        lastName: info.lastName,
        birthday: info.birthday,
        addressBookId: $('#first-col .content .selected').data('id')

    });
}

$(document).on('click', '#addPeople', function() {
    if ($('#first-col .content .selected').data('id') > 0) {
        $('#form').html('<form id="addPeoples" class="bootstrap-frm"><i class="fa fa-times-circle fa-2x" id="closeForm"></i><label>Set First Name:</label><input type="text" name="firstName"><label>Set Last Name:</label><input type="text" name="lastName"><label>Set Birthday:</label><input type="date" name="birthday"><button type="submit" id="createP" >submit</button></form>').show();
    }
    else {
        console.log("no addressbook selected");
    }

});

$(document).on('submit', '#addPeoples', function(e) {
    e.preventDefault();
    var info = {
        firstName: $('#form form input[name="firstName"]').val(),
        lastName: $('#form form input[name="lastName"]').val(),
        birthday: $('#form form input[name="birthday"]').val()
    };
    addPeople(info);
    $('#form').hide('slow');
    location.reload();
});



// delete people
$(document).on('click', '#deleteP', function() {
    var id = $(this).data('id');
    var con = confirm('are you sure you want to delete Person# ' + id + '???');
    if (con) {
        deletePeople(id);
    }
});

function deletePeople(id) {
    return $.ajax({
        url: API_URL + "/Entries/" + id,
        type: "DELETE",
        success: function() {
            location.reload();
        }
    });
}



//edit people
function editPerson(id, info) {
    return $.ajax({
        url: API_URL + "/Entries/" + id,
        type: 'PUT',
        success: function() {
            location.reload();
        },
        data: {
            firstName: info.firstName,
            lastName: info.lastName,
            birthday: info.birthday,
            addressBookId: $('#first-col .content .selected').data('id')
        }
    });
}

$(document).on('click', '#editP', function() {
    $('#form').html('<form id="editPeoples" class="bootstrap-frm"><i class="fa fa-times-circle fa-2x" id="closeForm"></i><label>Set First Name:</label><input type="text" name="firstName"><label>Set Last Name:</label><input type="text" name="lastName"><label>Set Birthday:</label><input type="date" name="birthday"><button type="submit" >submit</button></form>').show();
});


$(document).on('submit', '#editPeoples', function(e) {
    e.preventDefault();
    var temp = $('#mid-col .content .selected').data('id');
    var info = {
        firstName: $('#form form input[name="firstName"]').val(),
        lastName: $('#form form input[name="lastName"]').val(),
        birthday: $('#form form input[name="birthday"]').val()
    };
    $('#form').hide('slow');
    editPerson(temp, info);
});







//Entries
function addAddress(info) {
    return $.ajax({
        url: API_URL + "/Addresses",
        type: "POST",
        success: function() {
            location.reload();
        },
        data: {
            line1: info.line1,
            line2: info.line2,
            city: info.city,
            state: info.state,
            zip: info.zip,
            country: info.country,
            type: info.type,
            entryId: $('#mid-col .content .selected').data('id')
        }
    });
}

function addPhone(info) {
    return $.ajax({
        url: API_URL + "/Phones",
        type: "POST",
        success: function() {
            location.reload();
        },
        data: {
            phoneNumber: info.phoneNumber,
            type: info.type,
            phoneType: info.phoneType,
            entryId: $('#mid-col .content .selected').data('id')
        }
    });
}


function addEmail(info) {
    return $.ajax({
        url: API_URL + "/EmailAddresses",
        type: "POST",
        success: function() {
            location.reload();
        },
        data: {
            email: info.email,
            type: info.type,
            entryId: $('#mid-col .content .selected').data('id')
        }
    });
}

$(document).on('click', '#addEntry', function() {
    $('#form').html('<form id="addEntryChoice" class="bootstrap-frm"><i class="fa fa-times-circle fa-2x" id="closeForm"></i><label>Address</label><input type="radio" value="address" name="edit"><label>Phone</label><input type="radio" value="phone" name="edit"><label>Email</label><input type="radio" value="email" name="edit"><button type="submit" >submit</button></form>').show();
});

$(document).on('submit', '#addEntryChoice', function(e) {
    e.preventDefault();
    if ($('#form form input[name="edit"]:checked').val() === "address") {
        $('#form').html('<form id="addEntryAddress" class="bootstrap-frm"><i class="fa fa-times-circle fa-2x" id="closeForm"></i><label>Address line 1</label><input type="text" name="line1"><label>Address line 2</label><input type="text" name="line2"><label>City</label><input type="text" name="city"><label>state</label><input type="text" name="state"><label>zip</label><input type="text" name="zip"><label>country</label><input type="text" name="country"><label>Type</label><input type="text" name="type"><button type="submit" >submit</button></form>').show();
    }
    else if ($('#form form input[name="edit"]:checked').val() === "phone") {
        $('#form').html('<form id="addEntryPhone" class="bootstrap-frm"><i class="fa fa-times-circle fa-2x" id="closeForm"></i><label>Phone number</label><input type="text" name="phoneNumber"><label>Type</label><input type="text" name="type"><label>Phone type</label><input type="text" name="phoneType"><button type="submit" >submit</button></form>').show();
    }
    else if ($('#form form input[name="edit"]:checked').val() === "email") {
        $('#form').html('<form id="addEntryEmail" class="bootstrap-frm"><i class="fa fa-times-circle fa-2x" id="closeForm"></i><label>Email</label><input type="text" name="email"><label>Type</label><input type="text" name="type"><button type="submit" >submit</button></form>').show();
    }
});

$(document).on('submit', '#addEntryAddress', function(e) {
    e.preventDefault();
    var info = {


        line1: $('#form form input[name="line1"]').val(),
        line2: $('#form form input[name="line2"]').val(),
        city: $('#form form input[name="city"]').val(),
        state: $('#form form input[name="state"]').val(),
        zip: $('#form form input[name="zip"]').val(),
        country: $('#form form input[name="country"]').val(),
        type: $('#form form input[name="type"]').val(),

    };
    $('#form').hide('slow');
    addAddress(info);
});

$(document).on('submit', '#addEntryPhone', function(e) {
    e.preventDefault();

    var info = {
        phoneNumber: $('#form form input[name="phoneNumber"]').val(),
        type: $('#form form input[name="type"]').val(),
        phoneType: $('#form form input[name="phoneType"]').val()
    };
    $('#form').hide('slow');
    addPhone(info);
});

$(document).on('submit', '#addEntryEmail', function(e) {
    e.preventDefault();
    var info = {
        email: $('#form form input[name="email"]').val(),
        type: $('#form form input[name="type"]').val()
    };
    $('#form').hide('slow');
    addEmail(info);
});


//delete entries

$(document).on('click', '#deleteEntryPhone', function() {
    var id = $(this).data('id');
    var con = confirm('are you sure you want to delete Phone id# ' + id + '???');
    if (con) {
        deletePhone(id);
    }
});

function deletePhone(id) {
    return $.ajax({
        url: API_URL + "/Phones/" + id,
        type: "DELETE",
        success: function() {
            location.reload();
        }
    });
}

$(document).on('click', '#deleteEntryEmail', function() {
    var id = $(this).data('id');
    var con = confirm('are you sure you want to delete Email id# ' + id + '???');
    if (con) {
        deleteEmail(id);
    }
});

function deleteEmail(id) {
    return $.ajax({
        url: API_URL + "/EmailAddresses/" + id,
        type: "DELETE",
        success: function() {
            location.reload();
        }
    });
}

$(document).on('click', '#deleteEntryAddress', function() {
    var id = $(this).data('id');
    var con = confirm('are you sure you want to delete Address id# ' + id + '???');
    if (con) {
        deleteAddress(id);
    }
});

function deleteAddress(id) {
    return $.ajax({
        url: API_URL + "/Addresses/" + id,
        type: "DELETE",
        success: function() {
            location.reload();
        }
    });
}


//Edit Entries
function editPhone(id, info) {
    return $.ajax({
        url: API_URL + "/Phones/" + id,
        type: 'PUT',
        success: function() {
            location.reload();
        },
        data: {
            phoneNumber: info.phoneNumber,
            type: info.type,
            phoneType: info.phoneType,
            entryId: $('#mid-col .content .selected').data('id')
        }
    });
}

$(document).on('click', '#editEntryPhone', function() {
        $('#form').html('<form id="editPhone" class="bootstrap-frm"><i class="fa fa-times-circle fa-2x" id="closeForm"></i><label>Phone number</label><input type="text" name="phoneNumber"><label>Type</label><input type="text" name="type"><label>Phone type</label><input type="text" name="phoneType"><button type="submit" >submit</button></form>').show();
});


$(document).on('submit', '#editPhone', function(e) {
    e.preventDefault();
    var temp = $('#last-col .content .selected').data('id');
    var info = {
        phoneNumber: $('#form form input[name="phoneNumber"]').val(),
        type: $('#form form input[name="type"]').val(),
        phoneType: $('#form form input[name="phoneType"]').val()
    };
    $('#form').hide('slow');
    editPhone(temp, info);
});

function editAddress(id, info) {
    return $.ajax({
        url: API_URL + "/Addresses/" + id,
        type: 'PUT',
        success: function() {
            location.reload();
        },
        data: {
            line1: info.line1,
            line2: info.line2,
            city: info.city,
            state: info.state,
            zip: info.zip,
            country: info.country,
            type: info.type,
            entryId: $('#mid-col .content .selected').data('id')
        }
    });
}

$(document).on('click', '#editEntryAddress', function() {
        $('#form').html('<form id="editAddresses" class="bootstrap-frm"><i class="fa fa-times-circle fa-2x" id="closeForm"></i><label>Address line 1</label><input type="text" name="line1"><label>Address line 2</label><input type="text" name="line2"><label>City</label><input type="text" name="city"><label>state</label><input type="text" name="state"><label>zip</label><input type="text" name="zip"><label>country</label><input type="text" name="country"><label>Type</label><input type="text" name="type"><button type="submit" >submit</button></form>').show();
});


$(document).on('submit', '#editAddresses', function(e) {
    e.preventDefault();
    var temp = $('#last-col .content .selected').data('id');
    var info = {
        line1: $('#form form input[name="line1"]').val(),
        line2: $('#form form input[name="line2"]').val(),
        city: $('#form form input[name="city"]').val(),
        state: $('#form form input[name="state"]').val(),
        zip: $('#form form input[name="zip"]').val(),
        country: $('#form form input[name="country"]').val(),
        type: $('#form form input[name="type"]').val()
    };
    $('#form').hide('slow');
    editAddress(temp, info);
});

function editEmail(id, info) {
    return $.ajax({
        url: API_URL + "/EmailAddresses/" + id,
        type: 'PUT',
        success: function() {
            location.reload();
        },
        data: {
        email: info.email,
        type: info.type,
        entryId: $('#mid-col .content .selected').data('id')
        }
    });
}

$(document).on('click', '#editEntryEmail', function() {
        $('#form').html('<form id="editEmailAddresses" class="bootstrap-frm"><i class="fa fa-times-circle fa-2x" id="closeForm"></i><label>Email</label><input type="text" name="email"><label>Type</label><input type="text" name="type"><button type="submit" >submit</button></form>').show();
});


$(document).on('submit', '#editEmailAddresses', function(e) {
    e.preventDefault();
    var temp = $('#last-col .content .selected').data('id');
    var info = {
    email: $('#form form input[name="email"]').val(),
    type: $('#form form input[name="type"]').val()
    };
    $('#form').hide('slow');
    editEmail(temp, info);
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
    if ($(event.target).is('#editP') || $(event.target).is('#deleteP')) {

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
            $('#last-col .content').append('<article class="entries phoneEntry" data-id=' + ab.id + '><i class="fa fa-pencil fa-2x" id="editEntryPhone" data-id=' + ab.id + '></i><i class="fa fa-minus-square-o fa-2x" id="deleteEntryPhone" data-id=' + ab.id + '></i>' + ab.phoneType + ': ' + ab.phoneNumber + '</article>');
        });

        return getEntryAddress(entryId);
    }).then(function(result) {

        result.forEach(function(ab) {
            $('#last-col .content').append('<article class="entries addressEntry" data-id=' + ab.id + '><i class="fa fa-pencil fa-2x" id="editEntryAddress" data-id=' + ab.id + '></i><i class="fa fa-minus-square-o fa-2x" id="deleteEntryAddress" data-id=' + ab.id + '></i><p>' + ab.type + '</p><p>' + ab.line1 + ' ' + ab.line2 + '</p><p>' + ab.city + ' ' + ab.state + ' ' + ab.country + '</p><p>' + ab.zip + '</p></article>');
        });

        return getEntryEmail(entryId);
    }).then(function(result) {

        result.forEach(function(ab) {
            $('#last-col .content').append('<article class="entries emailEntry" data-id=' + ab.id + '><i class="fa fa-pencil fa-2x" id="editEntryEmail" data-id=' + ab.id + '></i><i class="fa fa-minus-square-o fa-2x" id="deleteEntryEmail" data-id=' + ab.id + '></i>' + ab.type + ': ' + ab.email + '</article>');
        });

        $('#last-col').pajinate({
            items_per_page: 3
        });
    });
}








$(document).on('click', '.entries', function() {
    if ($(event.target).is('#editEntryAddress') || $(event.target).is('#deleteEntryAddress') || $(event.target).is('#editEntryPhone')|| $(event.target).is('#deleteEntryPhone')|| $(event.target).is('#editEntryEmail')|| $(event.target).is('#deleteEntryEmail')) {

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
