Meteor.subscribe('all-events');
Meteor.subscribe('users-basic-info');


Template.postProd.helpers({
'display': function(){
return postFund.find()
}
});
  Template.postProd.events({
    'submit form':function(event)
    {
      event.preventDefault();
      var name=event.target.proname.value;
      var lang=event.target.Language.value;
      var cbud=event.target.currbudget.value;
      var gen=event.target.Genre.value;
      var write=event.target.writer.value;
      var dir=event.target.dirlock.value;
      var mdir=event.target.music.value;
      var cast=event.target.cast.value;
      var ban=event.target.banner.value;
      var pro=event.target.producer.value;
      var cen=event.target.censor.value;
      var rbud=event.target.budrequired.value;
      var uname=event.target.username.value;
      var email=event.target.usermail.value;
      var phone=event.target.userno.value;
      postFund.insert({
        Projectname:name,
Language:lang,
Genre:gen,
Writers:write,
Director: dir,
Producer:pro,
MusicDirector:mdir,
Cast:cast,
Banner:ban,
Censor:cen,
Budgetp : cbud,
Budgetr: rbud,
Username:uname,
Email:email,
Contact:phone,
ownerId: Meteor.userId()

      });
    }
  });
