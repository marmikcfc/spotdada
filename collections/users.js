Meteor.methods({
    set_on_mind: function(on_mind){
        if(on_mind.length > 1){
            Meteor.users.update({_id: Meteor.userId()},{$set:{'profile.on_mind': on_mind}});
        }else{
            Meteor.users.update({_id: Meteor.userId()},{$set:{'profile.on_mind': 'Change Status'}});
        }
        return true;
    },
    locked_screen_enable: function(){
        Meteor.users.update({_id: Meteor.userId()},{$set:{'profile.locked_screen': true}});
        return Router.go('locked_screen');
    },
    locked_screed_disable:function(){
        Meteor.users.update({_id: Meteor.userId()},{$set:{'profile.locked_screen': false}});
        return Router.go('home');
    }
});