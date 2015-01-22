Notifications = new Meteor.Collection("notifications");

Meteor.methods({
    read_chat: function(conv_id){

        var not_readed_count =  Chat.find({conv_id: conv_id, receiver: Meteor.userId()},{ readed: false } ).count();
        if(not_readed_count != 0){
            Notifications.remove({receiver: Meteor.userId(),conv_id:conv_id});
        }
        Chat.update({conv_id: conv_id ,receiver: Meteor.userId() , readed: false} ,{$set:{readed: true}},{multi: true});
        return [not_readed_count,conv_id];
    }
});

    Notifications.find().observeChanges({
        added: function(id, notif) {
            if(notif.receiver == Meteor.userId() ){
                if(Router.current().route.name != "conversation" || ( Router.current().route.name == "conversation" && Router.current().params._id != notif.sender) ){
                    Meteor.call('notify','<a href="/conversations/'+notif.sender+'">'+notif.message+'</a>', 'Info');
                    console.log('Notifications ADDED',notif);
                }
            }
        }
    });





