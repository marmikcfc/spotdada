Template.friends_audio.events({
    'click': function(){
        Meteor.subscribe('peopleAudio',this._id);
        Session.set('friend_audio',this._id);
        Player.user_id = this._id;
    },
    'click .my_music': function(){
        Session.set('friend_audio',false);
        Player.user_id = Meteor.userId();
    },
    'click .select_radio': function(){
        Player.radio(this);
    }
});
Template.friends_audio.helpers({
    friends: function(){
        friends = Friends.find({members: Meteor.userId() });
        my_friends =   _.flatten(_.pluck(friends.fetch(),'members'));
        return Meteor.users.find({$and:[{_id: { $in: my_friends } }, {_id: {$ne: Meteor.userId()}}] });
    },
    radios: function(){
        return Player.chanels;
    }
});


