Meteor.subscribe('notifications', Meteor.userId());

Template._header.events({
    'click ul li.new-page': function(event){
        var element = $(event.currentTarget);
        $('ul li.active').removeClass('active');
        element.addClass('active');
        Session.set('loginErr', null);
        Session.set('login-required-msg', null);
    },
    'click #btn-signout': function(event){
        event.preventDefault();
        event.stopPropagation();
        Meteor.logout(function(err){
            if(err) {
                console.log(err);
            }
            else {
                Router.go('/');
            }
        })
    },
    'click #brand-link': function(event){
        event.preventDefault();
        event.stopPropagation();
        $('ul li.active').removeClass('active');
        $('.home-page').addClass('active');
        Router.go('/');
    },
  /*  'click .notification-link': function(event){
        var self = this;
        Notifications.update({ _id: self._id },{ $set: { isChecked: true}}, function(err, doc){
            if (err) {
                console.log(err);
            }
            else {
                // done checking this notification
            }
        });
    }*/
});
/*
Template.navigation.rendered = function(){
    Tracker.autorun(function(){
        if (Session.get("currentNotifications")){
            document.title = "(" + Session.get("currentNotifications") + ") " + "APPNAME"; //TODO APPNAME is this app's temporary name. Remember to change this later.
        }
        if (Session.get("currentNotifications") === 0){
            document.title = "spotDada";
        }
    });
};
*//*
Template.navigation.helpers({
    activeNotificationCount: function(){
        var x = Notifications.find({isChecked: false}, {sort: {createdAt: -1}}).fetch();
        Session.set("currentNotifications", x.length);
        return x.length;
    },
    notifications: function(){
        return Notifications.find({}, {sort: {createdAt: -1}, limit: 10}).map(function(noti, num){
            noti.timeGap = moment(new Date(noti.createdAt)).from(new Date());
            return noti;
        });
    },
    isNew: function(){
        var self = this;
        return !self.isChecked;
    }
});*/
