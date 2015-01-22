Template.my_invites.events({
   'click .cancel_friend_request':function(){
       Meteor.call('cancel_invite', this._id);
   }
});

Template.invites.events({
    'click .decline_friendship':function(){
        Meteor.call('decline_friendship', this._id);
    },
    'click .accept_friendship':function(){
        Meteor.call('invite_new', this._id);
    }
});


Template.my_friends.events({
    'click .delete_friend':function(){
        Meteor.call('delete_friend', this._id);
    }
});




