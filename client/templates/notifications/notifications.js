Meteor.subscribe('notifications', Meteor.userId());

Template.notifications.helpers({
    notifications: function(){
        return Notifications.find({}, {sort: {createdAt: -1}}).map(function(noti, num){
            //noti.timeGap = moment(new Date(noti.createdAt)).from(new Date());
            noti.readableCreatedAt = moment(noti.createdAt).format('MMMM Do YYYY, h:mm a');
            return noti;
        });
    },
    isNew: function(){
        var self = this;
        return !self.isChecked;
    }
});