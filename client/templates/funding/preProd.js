Meteor.subscribe("all-prepod");
Meteor.subscribe("users-basic-info");
Template.preProd.helpers({
  display: function() {
    return preFund.find();
  }
});
Template.preProd.events({
  "click .customImageUploadBtn": function(e) {
    e.preventDefault();
    return document.getElementById("imageInput").click();
  },
  "submit form": function(event) {
    var eventData, projectImage, reader;
    event.preventDefault();
    event.stopPropagation();
    projectImage = $(event.target).find("[name=imageInput]")[0].files[0];
    reader = new FileReader();
    reader.onload = function(e) {
      var eventData;
      eventData = {
        name: $("#name").val(),
        syn: $("#rsyn").val(),
        cbud: $("#cbudget").val(),
        gen: $("#genre").val(),
        write: $("#write").val(),
        dir: $("#dir").val(),
        syn: $("#rsyn").val(),
        lang: $("#lang").val(),
        dirst: $("#dirst").val(),
        rbud: $("#budre").val(),
        ownerName: Meteor.user().profile.firstname + " " + Meteor.user().profile.lastname,
        ownerId: Meteor.userId(),
        email: Meteor.user().profile.usermail,
        contact: Meteor.user().profile.usernumber,
        src: e.target.result
      };
      return preFund.insert(eventData, function(err, doc) {
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
      eventData = {
        name: $("#name").val(),
        syn: $("#rsyn").val(),
        cbud: $("#cbudget").val(),
        gen: $("#genre").val(),
        write: $("#write").val(),
        dir: $("#dir").val(),
        syn: $("#rsyn").val(),
        lang: $("#lang").val(),
        dirst: $("#dirst").val(),
        rbud: $("#budre").val(),
        ownerName: Meteor.user().profile.firstname + " " + Meteor.user().profile.lastname,
        ownerId: Meteor.userId(),
        email: Meteor.user().profile.usermail,
        contact: Meteor.user().profile.usernumber,
        src: ""
      };
      preFund.insert(eventData, function(err, doc) {
        if (err) {
          return console.log(err);
        } else {
          return Router.go("/fundings");
        }
      });
    }
    console.log(eventData);
    return $("#add-event-modal").modal("hide");
  }
});