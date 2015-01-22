//Meteor.publish("conversations", function() {
  //  return Conversations.find({ members: {$in: [this.userId] }}, {limit: 10, sort: {created_at: -1} });
//});

Meteor.publish("people", function() {

    return [ImagesFS.find({avatar:{$ne: false}}),Meteor.users.find({})];
});

Meteor.publish("one_friend", function(friend_id) {
    return Friends.find({ members:  { $all : [ this.userId, friend_id ] } });
});

Meteor.publish("one_my_invite", function(friend_id) {
    return Invites.find({$and:[{sender: this.userId},{receiver: friend_id}]});
});
Meteor.publish("one_invite", function(friend_id) {
    return Invites.find({$and:[{receiver: this.userId},{sender: friend_id}]});
});
Meteor.publish("notifications", function() {
    return  Notifications.find({receiver: this.userId});
});



Meteor.publish("friends", function() {
    friends = Friends.find({members: this.userId});
    my_friends =   _.flatten(_.pluck(friends.fetch(),'members'));
    console.log(my_friends);
    return [ImagesFS.find({avatar:{$ne: false}}),Meteor.users.find({_id: { $in: my_friends } }),friends];
});
Meteor.publish("my_invites", function() {
    invites = Invites.find({sender: this.userId});
    my_invites = _.pluck(invites.fetch(),'receiver');
    return [Meteor.users.find({_id: { $in: my_invites } }),invites];
});


Meteor.publish("invites", function() {
    invites = Invites.find({receiver: this.userId});
    my_invites = _.pluck(invites.fetch(),'sender');
    return [Meteor.users.find({_id: { $in: my_invites } }),invites];
});


Meteor.publish("conversations", function() {
//    Chat.remove({});
//    Notifications.remove({});
    return  [ImagesFS.find({avatar:{$ne: false}}),Conversations.find({members: this.userId})];
});

Meteor.publish("conversation", function(friend_id) {
    convers = Conversations.find({ members:  { $all : [ this.userId, friend_id ] } });
    if(convers.count() == 0){
        Conversations.insert( {members: [this.userId, friend_id ]} );
    }
    return  [ImagesFS.find({avatar:{$ne: false}}),Conversations.find({ members:  { $all : [ this.userId, friend_id ] } })];
});
Meteor.publish("chat", function(friend_id) {
    var ids = _.pluck(Chat.find({sender: {$ne: this.userId }}).fetch(),'_id');
    Chat.update({_id:  ids },{$set:{readed: true}});
    conv_id = Conversations.findOne({ members:  { $all : [ this.userId, friend_id ] } })._id;
    return Chat.find({conv_id: conv_id});
});


Meteor.publish("wall", function(_id) {
    return [ImagesFS.find({avatar:{$ne: false}}),Walls.find({owner: _id})];
});
Meteor.publish("user", function(_id) {
    return Meteor.users.find(_id);
});

Meteor.publish("wallFiles", function(user_id) {
    return ImagesFS.find({ owner: user_id });
});
Meteor.publish("myFiles", function() {
    return ImagesFS.find({ owner: this.userId });
});

Meteor.publish("myAudio", function() {
    return AudioFS.find({ owner: this.userId });
});
Meteor.publish("peopleAudio", function(userId) {
    return AudioFS.find({ owner: userId });
});
FS.HTTP.publish(ImagesFS, function () {
    return ImagesFS.find();
});

