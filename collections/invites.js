Invites = new Meteor.Collection('invites');




Meteor.methods({
    invite_new: function(friend_id){
        userId = Meteor.userId();
        if(Invites.find({$and:[{sender: friend_id},{receiver: userId}]}).count() == 1){
            Meteor.call('new_friends',friend_id);
            Invites.remove({$and:[{sender: friend_id},{receiver: userId}]})
        }else{
            Invites.insert({sender: userId, receiver: friend_id});
        }
    },
    cancel_invite: function(friend_id){
        Invites.remove({ $and:[{ sender: Meteor.userId()}, {receiver: friend_id}] });
    },
    decline_friendship: function(friend_id){
        Invites.remove({ $and:[{ sender: friend_id}, {receiver: Meteor.userId()}] });
    }
});