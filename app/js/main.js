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


});

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
    addEntrytoView(data);
  });

  this.reset();

};

var addEntryToView = function(entry){

  var entryHTML = "<li class='entry' id='" + entry._id + "'>";
      entryHTML +=  "<div class='entryHeader'>";
      entryHTML +=    "<span class='name'>" + entry.lastName + ", " + entry.firstName + "</span>";
      entryHTML +=  "</div>";
      entryHTML +=  "<ul class='infoList'>";
      entryHTML +=    "<li class='email'>" + entry.email + "</span>";
      entryHTML +=    "<li class='phone'>" + entry.phoneNumber + "</span>";
      entryHTML +=    "<li class='twitter'>" + entry.twitter + "</span>";
      entryHTML +=    "<li class='linkedIn'>" + entry.linkedIn + "</span>";
      entryHTML +=  "</ul>";
      entryHTML +=  "<div class='menu'>";
      entryHTML +=    "<i class='fa fa-cog fa-lg'></i>";
      entryHTML +=    "<i class='options fa fa-pencil'></i>";
      entryHTML +=    "<i class='options fa fa-trash-o'></i>";
      entryHTML +=  "</div>";
      entryHTML += "</li>";

  $('#addressBook').prepend(entryHTML);
};


// Submit New Address Listener

$('#addEntry').on('submit', addEntry);



