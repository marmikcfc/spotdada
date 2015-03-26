Meteor.startup(function() {
	//process.env.MAIL_URL="smtp://marmikpandya%40gmail.com:jaladajalada@smtp.gmail.com:465/"; 
	Accounts.onCreateUser(function(options, user) {
	    user.privateMessages = [];
	    user.msgnotifications = [];
	    return user;

	});
});