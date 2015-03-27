//Meteor.subscribe('users-basic-info');
Meteor.subscribe('Notificationss');
Template.event.rendered = function(){
    $('ul li.active').removeClass('active');
};

Template.event.events({
    'click #btn-join-event': function(event){
        event.preventDefault();
        event.stopPropagation();
        var self = this;
        Events.update({ _id: this._id },{ $push: { attendees: Meteor.userId()}}, function(err, doc){
            if (err){
                console.log(err);
            }
            else {
                // successfully joined this event
                var fromUserFullname = Meteor.user().profile.firstname + ' ' + Meteor.user().profile.lastname;
                var updatedEvent = Events.findOne(self._id);
                var notificationData = {
                    fromUserId: Meteor.userId(),
                    fromUserFullname: fromUserFullname,
                    createdAt: new Date(),
                    userId: updatedEvent.ownerId,
                    content: fromUserFullname + ' has joined your event: ' + updatedEvent.name,
                    link: "/events/" + updatedEvent._id,
                    isChecked: false
                };
              /* Notifications.insert(notificationData, function(err, doc){
                    if (err) console.log(err);
                    else {
                        // done inserting notification
                    }
                });*/
  /*Notifications.insert(notificationData, function(error){
            if (err) {
                alert(error);
            }
            else{

                alert("Success");
            }
          
        });
*/

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
        Events.update({ _id: this._id },{ $pull: { attendees: Meteor.userId()}}, function(err, doc){
            if (err){
                console.log(err);
            }
            else {
                // successfully unjoined this event
                var fromUserFullname = Meteor.user().profile.firstname + ' ' + Meteor.user().profile.lastname;
                var updatedEvent = Events.findOne(self._id);
                var notificationData = {
                    fromUserId: Meteor.userId(),
                    fromUserFullname: fromUserFullname,
                    createdAt: new Date(),
                    userId: updatedEvent.ownerId,
                    content: fromUserFullname + ' has unjoined your event: ' + updatedEvent.name,
                    link: "/events/" + updatedEvent._id,
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
    },
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
        Events.update({ _id: this._id },{ $push: { comments: commentData}}, function(err, doc){
            if (err){
                console.log(err);
            }
            else {
                // successfully submitted new comment
                var fromUserFullname = Meteor.user().profile.firstname + ' ' + Meteor.user().profile.lastname;
                var updatedEvent = Events.findOne(self._id);
              var evtId=updatedEvent._id;
              
             /*   var notificationData = {
                    fromUserId: Meteor.userId(),
                    fromUserFullname: fromUserFullname,
                    createdAt: new Date(),
                    userId: updatedEvent.ownerId,
                    content: fromUserFullname + ' has commented in your event page: ' + updatedEvent.name,
                    link: "/events/" + updatedEvent._id,
                    isChecked: false
                };*/

var username = Meteor.user().username;
var ownerid= updatedEvent.ownerId;    
var commenterId= Meteor.userId();
           
//              console.log(up);
        console.log("Commentor"+commenterId);
        console.log("Owner"+ownerid);
              
              if(ownerid !== commenterId)
                {
                  console.log("Different owner and commenter");
                  Notificationss.insert({
      userId: updatedEvent.ownerId,
      projectId: evtId,
      commentId:'',
      commenter: username,
      isEvent: true,
      read: false
    });
                  
                }



               /* Notifications.insert(notificationData, function(err, doc){
                    if (err) console.log(err);
                    else {
                        // done inserting notification
                    }
                });*/
            }
        });
        $("#user-comment").val(''); // reset the input
    }
});
Template.event.helpers({
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
    isJoined: function(){
        var res = false;
        var self = this;
        Tracker.autorun(function(){
            if(self.attendees){
                var attendees = self.attendees;
                var thisUserId = Meteor.userId();
                res = attendees.indexOf(thisUserId);
            }
        });
        return (res !== -1);
    },
    attendeesList: function(){
        var self = this;
        Tracker.autorun(function(){
            if(self.attendees){
                var atList = self.attendees.map(function(userId, num){
                    var user = Meteor.users.findOne({_id: userId});
                    user.fullname = user.profile.firstname + ' ' + user.profile.lastname;
                    return user;
                });
                Session.set('attendees', atList); // TODO is this the best way to do this ?
            }
        });
        return Session.get('attendees');
    },
    getUserAvatar: function(userId){
        return Meteor.users.findOne(userId).profile.avatar;
    }
});
