;(function (){

  'use strict';



// Needed Variables

var url = 'http://tiy-515.herokuapp.com/collections/meade-addressbook/';
var idToEdit;



// Defines HTML layout of entries appended to page

var addEntryToView = function(entry){

  var entryHTML = "<li class='entry' id='" + entry._id + "'>";
      entryHTML +=  "<div class='entryHeader'>";
      entryHTML +=    "<span class='name'>" + entry.lastName + ", " + entry.firstName + "</span>";
      entryHTML +=  "</div>";
      entryHTML +=  "<ul class='infoList'>";
      entryHTML +=    "<li class='email'>" + entry.email + "</li>";
      entryHTML +=    "<li class='phone'>" + entry.phoneNumber + "</li>";
      entryHTML +=    "<li class='twitter'>" + entry.twitter + "</li>";
      entryHTML +=    "<li class='linkedIn'>" + entry.linkedIn + "</li>";
      entryHTML +=  "</ul>";
      entryHTML +=  "<div class='menu'>";
      entryHTML +=    "<i class='fa fa-cog fa-lg'></i>";
      entryHTML +=    "<i class='options fa fa-pencil'></i>";
      entryHTML +=    "<i class='options fa fa-trash-o'></i>";
      entryHTML +=  "</div>";
      entryHTML += "</li>";

  $('#addressBook').append(entryHTML);


};



//Pulls values from HTML input and defines new instance using Backbone model

var addEntry = function(e){

  e.preventDefault();

  var entryFirstName = $('#firstName').val();
  var entryLastName = $('#lastName').val();
  var entryEmail = $('#email').val();
  var entryPhoneNumber = $('#pNumber').val();
  var entryTwitter = $('#twitter').val();
  var entryLinkedIn = $('#linkedIn').val();

  var entry = new Entry({
    firstName: entryFirstName,
    lastName: entryLastName,
    email: entryEmail,
    phoneNumber: entryPhoneNumber,
    twitter: entryTwitter,
    linkedIn: entryLinkedIn
  });

  allEntries.add(entry).save().success(function(data){
    addEntryToView(data);
  });

  $('#addEntry')[0].reset();

};


//Pulls values from HTML input and defines new instance using Backbone model

var editEntry = function(e){

  e.preventDefault();

  var entryFirstName = $('#firstName').val();
  var entryLastName = $('#lastName').val();
  var entryEmail = $('#email').val();
  var entryPhoneNumber = $('#pNumber').val();
  var entryTwitter = $('#twitter').val();
  var entryLinkedIn = $('#linkedIn').val();

  var contact = allEntries.get(idToEdit);

  contact.save(
    {
      firstName: entryFirstName,
      lastName: entryLastName,
      email: entryEmail,
      phoneNumber: entryPhoneNumber,
      twitter: entryTwitter,
      linkedIn: entryLinkedIn
    },
    {
      dataType: "text",
      success: function() {
        console.log("I am actually saving.");
        document.location.reload();
      }
    });

};



// Submit New Address Listener

$('#addEntry').on('click', '#submitBtn', addEntry);



// Displays saved entries on page

var allEntries = new EntryCollection();

allEntries.fetch().done(function(){

  allEntries.each(function(model) {
    addEntryToView(model.attributes);
  });


// Hover Styling on Properties Menu

  $('.menu').on('mouseenter', function(){
    $(this).find('.fa-cog').toggleClass('fa-spin');
    $(this).toggleClass('menuhover');
  });

  $('.menu').on('mouseleave', function(){
    $(this).find('.fa-cog').toggleClass('fa-spin');
    $(this).toggleClass('menuhover');
  });

// Delete Button (Trash can icon in hover menu)

  $('.entry').on('click', '.fa-trash-o', function(e){

    e.preventDefault();

    var idToDelete = $(this).parent().parent().attr('id');
    var contactToDelete = $(this).parent().parent();

    $.ajax({
      url: url + idToDelete,
      type: 'DELETE'
    }).done( function () {
    contactToDelete.fadeOut();
    });
  });



  // Edit button function

  $('.entry').on('click', '.fa-pencil', function(e){

    e.preventDefault();

    $(this).parent().parent().addClass('editingInfo');

    $(document).find('#submitBtn').addClass('editingBtn');

    $(document).find('#editBtn').addClass('addEdit');


    idToEdit = $(this).parent().parent().attr('id');
    var contactToEdit = $(this).parent().parent();

    var editURL = url + idToEdit;

    $.getJSON(editURL, function(contact){
      $('#firstName').val(contact.firstName);
      $('#lastName').val(contact.lastName);
      $('#email').val(contact.email);
      $('#pNumber').val(contact.phoneNumber);
      $('#twitter').val(contact.twitter);
      $('#linkedIn').val(contact.linkedIn);
    });

    // Submit Changes Button Listener

    $('#addEntry').on('click', '#editBtn', editEntry);

  });
});



}());
