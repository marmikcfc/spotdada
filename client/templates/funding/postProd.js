Meteor.subscribe('all-postprod');
Meteor.subscribe('users-basic-info');

  Template.postProd.helpers({
'display': function(){
return postFund.find()
}
});

 Template.postProd.events({

     'click #btn-submit-event': function(event) {
        event.preventDefault();
        event.stopPropagation();
        var fundData = {
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
            cast: $('#cast').val(),
            banner: $('#banner').val(),
            producer: $('#producer').val(),
            md: $('#md').val(),
            censor: $('#censor').val(),
            ownerName: Meteor.user().profile.firstname + ' ' + Meteor.user().profile.lastname,
            ownerId: Meteor.userId(),
            email:Meteor.user().profile.usermail,
            contact:Meteor.user().profile.usernumber
            
        };
        console.log(fundData); // TODO for debugging. Need to be removed later
        postFund.insert(fundData, function(err, doc){
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
