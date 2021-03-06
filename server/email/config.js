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



Accounts.emailTemplates.siteName = "Spotdada";
Accounts.emailTemplates.from = "Spotdada <support@spotdada.in>";
Accounts.emailTemplates.resetPassword.subject = function (user) {
    return "Message for " + user.profile.displayName;
};
Accounts.emailTemplates.resetPassword.text = function (user, url) {
    var signature = "MySite Bot";
    //var president = President.findOne();
    //if (president)
    //    president = Meteor.users.findOne(president.presidentId);
    //    signature = president.profile.displayName + ", the MySite President.";
    return "Dear " + user.username+ ",\n\n" +
        "Click the following link to set your new password:\n" +
        url + "\n\n" +
        "Please never forget it again!!!\n\n\n" +
        "Cheers,\n" +
        "Marmikk Pandya";
};

Accounts.emailTemplates.verifyEmail.text = function (user, url) {
    var signature = "Spotdada Bot";
    //var president = President.findOne();
    //if (president)
    //    president = Meteor.users.findOne(president.presidentId);
        signature = "Marmik PAndya" + ", the spotDada CTO";
    return "Dear " + user.username+ ",\n\n" +
        "Thanks a lot for joining spotDada:\n" +
        url + "\n\n" +
        "Please never forget it again!!!\n\n\n" +
        "Cheers,\n" +
        signature;
};