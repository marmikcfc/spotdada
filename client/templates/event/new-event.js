var tags = []; // for temporary store the tags assigned to an event

Template.newEvent.rendered = function(){
    $('.datetimepicker').datetimepicker();
};

Template.newEvent.events({
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

        var eventData = {
            name: $('#event-name').val(),
            description: $('#event-description').val(),
            startTime: new Date($('#event-start-time').val()),
            endTime: new Date($('#event-end-time').val()),
            location: $('#event-location').val(),
            createdAt: new Date(),
            ownerName: Meteor.user().profile.firstname + ' ' + Meteor.user().profile.lastname,
            ownerId: Meteor.userId(),
            cost: $('#event-cost').val(),
            attendees: [],
            tags: tags,
            src: e.target.result
        };
     //   console.log(eventData); // TODO for debugging. Need to be removed later
       return Events.insert(eventData, function(err, doc) {
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

 var eventData = {
            name: $('#event-name').val(),
            description: $('#event-description').val(),
            startTime: new Date($('#event-start-time').val()),
            endTime: new Date($('#event-end-time').val()),
            location: $('#event-location').val(),
            createdAt: new Date(),
            ownerName: Meteor.user().profile.firstname + ' ' + Meteor.user().profile.lastname,
            ownerId: Meteor.userId(),
            cost: $('#event-cost').val(),
            attendees: [],
            tags: tags,
            src: ""
        };

         return Events.insert(eventData, function(err, doc) {
        if (err) {
          return console.log(err);
        } else {
          return Router.go("/fundings");
        }
      });

    }
},
    'click #btn-add-tag': function(event){
        var tag = $("#tagInput").val().trim();
        if (!isDuplicated(tag, tags)) tags.push(tag);
        $("#tagInput").val('');
        // re-render
        var tagsMarkup = getTagsMarkup(tags);
        $(".tags-list").html(tagsMarkup);
    },
    'keydown #tagInput': function(event){
        if (event.keyCode == 13){
            var tag = $("#tagInput").val().trim();
            if (!isDuplicated(tag, tags)) tags.push(tag);
            $("#tagInput").val('');
            // re-render
            var tagsMarkup = getTagsMarkup(tags);
            $(".tags-list").html(tagsMarkup);
        }
    },
    'click .dismiss-tag': function(event){
        var element = $(event.currentTarget);
        var tagContent = element.parent().text();
        tags.splice(tags.indexOf(tagContent), 1);
        // re-render
        var tagsMarkup = getTagsMarkup(tags);
        $(".tags-list").html(tagsMarkup);
    }
});

function getTagsMarkup(data){
    var tagDismissButtonMarkup = '<i class="fa fa-times dismiss-tag"></i>';
    var res = '';
    data.forEach(function(element){
        var temp = '<span class="tag">';
        temp = temp + element + tagDismissButtonMarkup;
        temp += '</span>';
        res += temp;
    });
    return res;
}

function isDuplicated(tag, tags){
    var index = tags.indexOf(tag);
    return (index !== -1);
}

