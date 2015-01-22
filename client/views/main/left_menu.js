Template.left_menu.events({
    'click .show_drop_menu':function(){
      $('.drop_menu').slideToggle('fast');
    },
    'click .sign_out': function(){
        Meteor.logout(Router.go('login'));
    }
});
Template.left_menu.helpers({
    active: function(path){
        if(Router.current().path == path){
            return 'active';
        }
    },
    notifications: function(){
        return Notifications.find({conv_id:{$exists: true}}).count();
    },
    invitations_count: function(){
//        Notifications.findOne().request;
        return Invites.find({receiver: Meteor.userId() }).count();
    }


});