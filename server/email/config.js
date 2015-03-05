/*Meteor.startup(function() {

  Meteor.Mailgun.config({
    username: 'marmikpandya@gmail.com',
    password: 'marmikcfc'
  });

  Meteor.methods({
    'sendContactEmail': function(name, email, message) {
      this.unblock();

      Meteor.Mailgun.send({
        to: 'recipient@example.com',
        from: name + ' <' + email + '>',
        subject: 'New Contact Form Message',
        text: message,
        html: Handlebars.templates['contactEmail']({siteURL: Meteor.absoluteUrl(), fromName: name, fromEmail: email, message: message})
      });
    }
  });
});
*/



Accounts.emailTemplates.siteName = "MySite";
Accounts.emailTemplates.from = "MySite <support@mysite.com>";
Accounts.emailTemplates.resetPassword.subject = function (user) {
    return "Message for " + user.profile.displayName;
};
Accounts.emailTemplates.resetPassword.text = function (user, url) {
    var signature = "MySite Bot";
    //var president = President.findOne();
    //if (president)
    //    president = Meteor.users.findOne(president.presidentId);
    //    signature = president.profile.displayName + ", the MySite President.";
    return "Dear " + user.profile.firstname +user.profile.lastname+ ",\n\n" +
        "Click the following link to set your new password:\n" +
        url + "\n\n" +
        "Please never forget it again!!!\n\n\n" +
        "Cheers,\n" +
        "Marmikk Pandya";
};

Accounts.emailTemplates.verifyEmail.text = function (user, url) {
    var signature = "MySite Bot";
    //var president = President.findOne();
    //if (president)
    //    president = Meteor.users.findOne(president.presidentId);
    //    signature = president.profile.displayName + ", the MySite President.";
    return "Dear " + user.profile.firstname + user.profile.lastname+ ",\n\n" +
        "Click the following link to set your new password:\n" +
        url + "\n\n" +
        "Please never forget it again!!!\n\n\n" +
        "Cheers,\n" +
        signature;
};