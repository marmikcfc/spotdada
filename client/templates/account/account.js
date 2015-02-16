Template.account.events({
    'blur .form-control': function(event){
        var el = $(event.currentTarget)[0];
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
            function(err, doc){
            if (err){
                console.log(err);
            }
            else {
                //console.log(Meteor.user());
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