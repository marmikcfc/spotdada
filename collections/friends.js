Friends = new Meteor.Collection('friends');


Meteor.methods({
    new_friends: function(friend_id){
        if(Friends.find(  { members:  { $all : [Meteor.userId(), friend_id] } }).count() == 1){
            console.log('FRIENDSHIP ALREADY EXIST');
        }else{
            Friends.insert({members:  [Meteor.userId(), friend_id]});
        }
    },
    delete_friend: function(friend_id){
        Friends.remove({ members:  { $all : [Meteor.userId(), friend_id] } });
        Meteor.call('cancel_invite',friend_id);
    }
});