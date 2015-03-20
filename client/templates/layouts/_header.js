Meteor.subscribe('notificationss', Meteor.userId());

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

'click .messages-block': function () {
        "use strict";
        Meteor.call('markAllmsgNotificationsAsRead', Meteor.userId(), function (err) {
            if (err) {
                throwAlert('error', error.reason, error.details);
                return null;
            }
        });
    }
   /*'click .msgnotifications-block': function () {
        "use strict";
        setSessionForActiveNavTab('privateMessagesList');
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
*/
Template._header.helpers({
    msgnotificationCount: function () {
        "use strict";
        if (Meteor.user().msgnotifications === undefined || Meteor.user().msgnotifications.length === 0) {
            return 0;
        }
        if (Meteor.user().msgnotifications.length > 0) {
            return msgNotifications.find({_id: {$in: Meteor.user().msgnotifications}}).count();
        }
    }
});

