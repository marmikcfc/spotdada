Walls = new Meteor.Collection("walls");



Meteor.methods({
    new_wall: function(message,sender_id){
        console.log('sender_id',sender_id);
        Walls.insert({owner: sender_id, sender: Meteor.userId(),senderName:  Meteor.user().profile.name , message: message, created_at: new Date().getTime()});
    },
    remove_wall: function(_id){
        Walls.remove(_id);
    }



});