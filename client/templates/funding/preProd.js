Meteor.subscribe('all-prepod');
Meteor.subscribe('users-basic-info');

  Template.preProd.helpers({
'display': function(){
return preFund.find()
}
});





  Template.preProd.events({

     'click #btn-submit-event': function(event) {
        event.preventDefault();
        event.stopPropagation();
        var eventData = {
            name: $('#name').val(),
            syn: $('#rsyn').val(),
            cbud: $('#cbudget').val(),
            gen: $('#genre').val(),
            write: $('#write').val(),
            dir: $('#dir').val(),
            syn: $('#rsyn').val(),
            lang: $('#lang').val(),
            dirst: $('#dirst').val(),
            rbud: $('#budre').val(),
            ownerName: Meteor.user().profile.firstname + ' ' + Meteor.user().profile.lastname,
            ownerId: Meteor.userId(),
            email:Meteor.user().profile.usermail,
            contact:Meteor.user().profile.usernumber
            
        };
        console.log(eventData); // TODO for debugging. Need to be removed later
        preFund.insert(eventData, function(err, doc){
            if (err) {
                console.log(err);
            }
            else {
                Router.go('/fundings');
            }
        });
        $('#add-event-modal').modal('hide');
    }

  });
