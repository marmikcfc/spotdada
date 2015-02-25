Meteor.subscribe('all-postprod');
Meteor.subscribe('users-basic-info');

  Template.postProd.helpers({
'display': function(){
return postFund.find()
}
});

 Template.postProd.events({
"click .customImageUploadBtn": function(e) {
    e.preventDefault();
    return document.getElementById("imageInput").click();
  },
     'submit form': function(event) {
        event.preventDefault();
        event.stopPropagation();
        projectImage = $(event.target).find("[name=imageInput]")[0].files[0];
        reader = new FileReader();
    
        reader.onload = function(e) {
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
            tlink: $('#tlink').val(),
            ownerName: Meteor.user().profile.firstname + ' ' + Meteor.user().profile.lastname,
            ownerId: Meteor.userId(),
            email:Meteor.user().profile.usermail,
            contact:Meteor.user().profile.usernumber,
            src: e.target.result
            
        };

   return postFund.insert(fundData, function(err, doc) {
        if (err) {
          return console.log(err);
        } else {
          return Router.go("/fundings");
        }
      });

    };

 if (projectImage) {
      reader.readAsDataURL(projectImage);
    } else {
      fundData = {
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
            contact:Meteor.user().profile.usernumber,
            src: ""
      };
      postFund.insert(fundData, function(err, doc) {
        if (err) {
          return console.log(err);
        } else {
          return Router.go("/fundings");
        }
      });
    }

        
        $('#add-event-modal').modal('hide');
    }

  });
