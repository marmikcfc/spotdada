Meteor.startup(function() {
	
	Accounts.onCreateUser(function(options, user) {
	    user.privateMessages = [];
	    user.msgnotifications = [];
  
	    return user;
	});
});