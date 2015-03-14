var tags = []; // for temporary store the tags assigned to an event

Template.account.events({
    'submit form': function(event){
        var el = $(event.currentTarget)[0];
        var fname=$("#user-firstname").val();
        var lname=$("#user-lastname").val();
        var data = {
            "username": $("#username").val().trim(),
            "profile": {
                "firstname": $("#user-firstname").val(),
                "lastname": $("#user-lastname").val(),
                "gender": $("#user-gender").val(),
                "birthday": $("#user-birthday").val(),
                "bio": $("#user-bio").val(),
                "city": $("#user-city").val(),
                "lang": $("#language").val(),
                "usernumber": $("#cnnumber").val(),
                "usermail": $("#email").val(),
                "uservs": $("#vstat").val(),
                "userfund": $("#fund").val(),
                "userfwa": $("#fwa").val(),
                "org": $("#user-org").val()

            }
        };
        Meteor.users.update({_id: Meteor.userId()},
            {
                $set: data
            },
            function(error, doc){
            if (error){
                alert(error);
            }
            else {
                console.log(Meteor.user());
            }
        });
    },
    'click .btn-remove-avatar': function(event){
        var userId = Meteor.userId();
        Meteor.users.update({_id: userId}, {
            $set: {
                "profile.avatar": null
            }
        });
    },
    'click .btn-change-avatar': function(event){
        $('#avatar-upload').click();
    },
    'change #avatar-upload': function(event, template){
        var file = event.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            var userId = Meteor.userId();
            Meteor.call('avatar-upload', userId, file, reader.result);
        };
        reader.readAsDataURL(file);
    },
      'click #btn-add-tag': function(event){
        
//Retrive Tags        
        var uid = Meteor.userId();
        var user=Meteor.users.findOne({_id: uid});
        tags=user.profile.tags;
        var tag = $("#tagInput").val().trim();
        if (!isDuplicated(tag, tags)) tags.push(tag);
        $("#tagInput").val('');

        //Add into Database
              Meteor.users.update({_id: uid},
            {
                $set: {
                  
                  "profile.tags": tags
                  
                }
            },
            function(error, doc){
            if (error){
                alert(error);
            }
            else {
                console.log(Meteor.user());
            }
        });
        
        // re-render
        var tagsMarkup = getTagsMarkup(tags);
        $(".tags-list").html(tagsMarkup);
    },
    'keydown #tagInput': function(event){
        if (event.keyCode == 13){
            
          //Retrive Tags
            var uid = Meteor.userId();
            var user=Meteor.users.findOne({_id: uid});
            tags=user.profile.tags;
            var tag = $("#tagInput").val().trim();
            if (!isDuplicated(tag, tags)) tags.push(tag);
                
          //Add into Database
              Meteor.users.update({_id: uid},
            {
                $set: {
                  
                  "profile.tags": tags
                  
                }
            },
            function(error, doc){
            if (error){
                alert(error);
            }
            else {
                console.log(Meteor.user());
            }
        });
 
            $("#tagInput").val('');
            // re-render
            var tagsMarkup = getTagsMarkup(tags);
            $(".tags-list").html(tagsMarkup);
        }
      console.log(username);
    },
    'click .dismiss-tag': function(event){

//Retrive Tags        
        var uid = Meteor.userId();
        var user=Meteor.users.findOne({_id: uid});
        tags=user.profile.tags;            
        var element = $(event.currentTarget);
        var tagContent = element.parent().text();
        tags.splice(tags.indexOf(tagContent), 1);
      
             //Add into Database
              Meteor.users.update({_id: uid},
            {
                $set: {
                  
                  "profile.tags": tags
                  
                }
            },
            function(error, doc){
            if (error){
                alert(error);
            }
            else {
                console.log(Meteor.user());
            }
        });
 
      
      
        // re-render
        var tagsMarkup = getTagsMarkup(tags);
        $(".tags-list").html(tagsMarkup);
    }
});

Template.account.rendered = function(){
    Tracker.autorun(function(){
        if (Meteor.user()){
            var user = Meteor.user();
            $("#user-gender").val(user.profile.gender);
        }
    });
    $('#user-birthday').datepicker();
};


//helpers for adding tags
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

function getTags(userid){


//var user=Meteor.users.findOne({_id: userid});
//tags=user.profile.tags;
//  return tags;
}




