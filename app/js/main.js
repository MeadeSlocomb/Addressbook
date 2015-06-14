;(function (){

  'use strict';



// Needed Variables

var url = 'http://tiy-515.herokuapp.com/collections/meade-addressbook/';



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



// Hover Styling on Properties Menu

  $('.menu').on('mouseenter', function(e){
    $(this).find('.fa-cog').toggleClass('fa-spin');
    $(this).toggleClass('menuhover');
  });

  $('.menu').on('mouseleave', function(e){
    $(this).find('.fa-cog').toggleClass('fa-spin');
    $(this).toggleClass('menuhover');
  });



// Delete Button

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
};



//Pulls values from HTML input and defines new instance using Backbone model

var addEntry = function(e){

  e.preventDefault();

  var entryFirstName = $(this).find('#firstName').val();
  var entryLastName = $(this).find('#lastName').val();
  var entryEmail = $(this).find('#email').val();
  var entryPhoneNumber = $(this).find('#pNumber').val();
  var entryTwitter = $(this).find('#twitter').val();
  var entryLinkedIn = $(this).find('#linkedIn').val();

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

  this.reset();

};



// Submit New Address Listener

$('#addEntry').on('submit', addEntry);



// Displays saved entries on page

var allEntries = new EntryCollection();

allEntries.fetch().done(function(){

  allEntries.each(function(model) {
    addEntryToView(model.attributes);
  });


});








}());
