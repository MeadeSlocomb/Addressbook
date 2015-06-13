var Entry = Backbone.Model.extend({

  initialize: function(){
  },

  idAttribute: '_id',

  defaults: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    twitter: '',
    linkedIn: ''
  },


});
