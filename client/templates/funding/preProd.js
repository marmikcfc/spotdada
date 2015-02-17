Meteor.subscribe('all-events');
Meteor.subscribe('users-basic-info');

  Template.preProd.helpers({
'display': function(){
return preFund.find()
}
});
  Template.preProd.events({
    'submit form':function(event)
    {
      event.preventDefault();
      var name=event.target.proname.value;
      var lang=event.target.Language.value;
      var cbud=event.target.currbudget.value;
      var gen=event.target.Genre.value;
      var write=event.target.writer.value;
      var dir=event.target.dirlock.value;
      var syn=event.target.syn.value;
      var dirst=event.target.dirstmnt.value;
      var rbud=event.target.budrequired.value;
       var uname=event.target.username.value;
      var email=event.target.usermail.value;
      var phone=event.target.userno.value;
      preFund.insert({
        Projectname:name,
Language:lang,
Genre:gen,
Writers:write,
Director: dir,
Synopsis:syn,
Directorsstatement:dirst,
Budgetp : cbud,
Budgetr: rbud,
Username:Meteor.user().username,
Email:Meteor.user().profile.usermail,
Contact:Meteor.user().profile.usernumber,
ownerName: Meteor.user().profile.firstname + ' ' + Meteor.user().profile.lastname,
ownerId: Meteor.userId()

      });
    }
  });
