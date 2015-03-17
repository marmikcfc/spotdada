//Meteor.subscribe('users-basic-info');
Meteor.subscribe('all-postprod');

Template.preFund.rendered = function(){
    $('ul li.active').removeClass('active');
};

Template.preFund.events({
 /*   'click #btn-join-event': function(event){
        event.preventDefault();
        event.stopPropagation();
        var self = this;
        preFund.update({ _id: this._id },{ $push: { interested: Meteor.userId()}}, function(err, doc){
            if (err){
                console.log(err);
            }
            else {
                // successfully joined this event
                var fromUserFullname = Meteor.user().profile.firstname + ' ' + Meteor.user().profile.lastname;
                var updatedEvent = preFund.findOne(self._id);
                var notificationData = {
                    fromUserId: Meteor.userId(),
                    fromUserFullname: fromUserFullname,
                    createdAt: new Date(),
                    userId: updatedEvent.ownerId,
                    content: fromUserFullname + ' is interested in your movie: ' + updatedEvent.name,
                    link: "/prefund/" + updatedEvent._id,
                    isChecked: false
                };
              Notifications.insert(notificationData, function(err, doc){
                    if (err) console.log(err);
                    else {
                        // done inserting notification
                    }
                });
            }
        });
    },
    'mouseover #btn-unjoin-event': function(event){
        event.preventDefault();
        event.stopPropagation();
        var el = $(event.currentTarget);
        el.removeClass();
        el.addClass('btn btn-danger pull-right');
        el.find('span').text('Unjoin');
    },
    'mouseout #btn-unjoin-event': function(event){
        event.preventDefault();
        event.stopPropagation();
        var el = $(event.currentTarget);
        el.removeClass();
        el.addClass("btn btn-success pull-right");
        el.find('span').text('Going');
    },
    'click #btn-unjoin-event': function(event){
        event.preventDefault();
        event.stopPropagation();
        var self = this;
        preFund.update({ _id: this._id },{ $pull: { interested: Meteor.userId()}}, function(err, doc){
            if (err){
                console.log(err);
            }
            else {
                // successfully unjoined this event
                var fromUserFullname = Meteor.user().profile.firstname + ' ' + Meteor.user().profile.lastname;
                var updatedEvent = preFund.findOne(self._id);
                var notificationData = {
                    fromUserId: Meteor.userId(),
                    fromUserFullname: fromUserFullname,
                    createdAt: new Date(),
                    userId: updatedEvent.ownerId,
                    content: fromUserFullname + ' has unjoined your event: ' + updatedEvent.name,
                    link: "/prefund/" + updatedEvent._id,
                    isChecked: false
                };
                Notifications.insert(notificationData, function(err, doc){
                    if (err) console.log(err);
                    else {
                        // done inserting notification
                    }
                });
            }
        });
    },*/
    'click #btn-send-comment': function(event){
        event.preventDefault();
        event.stopPropagation();
        var self = this;
        var comment = $("#user-comment").val();
        var userId = Meteor.userId();
        var username= userId.username;
        var userFullname = Meteor.user().profile.firstname + ' ' + Meteor.user().profile.lastname;
        var commentData = {
            userId: userId,
            userFullname: userFullname,
            comment: comment,
            createdAt: new Date(),
            createdAtReadable: moment(Date.now()).format('MMMM Do YYYY, h:mm a')
        };
        prefund.update({ _id: this._id },{ $push: { comments: commentData}}, function(err, doc){
            if (err){
                console.log(err);
            }
            else {
                // successfully submitted new comment
                var fromUserFullname = Meteor.user().profile.firstname + ' ' + Meteor.user().profile.lastname;
                var updatedEvent = prefund.findOne(self._id);
                var notificationData = {
                    fromUserId: Meteor.userId(),
                    fromUserFullname: fromUserFullname,
                    createdAt: new Date(),
                    userId: updatedEvent.ownerId,
                    content: fromUserFullname + ' has commented in your event page: ' + updatedEvent.name,
                    link: "/prefund/" + updatedEvent._id,
                    isChecked: false
                };
                Notificationss.insert(notificationData, function(err, doc){
                    if (err) console.log(err);
                    else {
                        // done inserting notification
                    }
                });
            }
        });
        $("#user-comment").val(''); // reset the input
    }
});
Template.preFund.helpers({
    owner: function(){
        var self = this;
        var temp = null;
        Tracker.autorun(function(){
            if (self.ownerId){
                temp = Meteor.users.findOne(self.ownerId);
            }
        });
        return temp;
    },
  /*  isJoined: function(){
        var res = false;
        var self = this;
        Tracker.autorun(function(){
            if(self.interested){
                var interested = self.interested;
                var thisUserId = Meteor.userId();
                res = interested.indexOf(thisUserId);
            }
        });
        return (res !== -1);
    },
    interestedList: function(){
        var self = this;
        Tracker.autorun(function(){
            if(self.interested){
                var atList = self.interested.map(function(userId, num){
                    var user = Meteor.users.findOne({_id: userId});
                    user.fullname = user.profile.firstname + ' ' + user.profile.lastname;
                    return user;
                });
                Session.set('interested', atList); // TODO is this the best way to do this ?
            }
        });
        return Session.get('interested');
    },
    'displayprefund': function(){
            return preFund.find()
                },*/
    getUserAvatar: function(userId){
        return Meteor.users.findOne(userId).profile.avatar;
    }
});

