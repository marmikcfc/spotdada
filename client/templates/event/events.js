Meteor.subscribe('all-events');
//Meteor.subscribe('users-basic-info');

// Create search source for events in the client
var options = {
    keepHistory: 1000 * 60 * 5,
    localSearch: true
};
var fields = ['name', 'location', 'ownerName', 'description'];
EventSearch = new SearchSource('events', fields, options);
console.log("Event SEacrch:"+ EventSearch);
// Done creating search source

Template.events.events({
    'click #btn-join-event': function(event){
        event.preventDefault();
        event.stopPropagation();
        var self = this;
        if (Meteor.userId()){
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
                  /*  Notifications.insert(notificationData, function(err, doc){
                        if (err) console.log(err);
                        else {
                            // done inserting notification
                        }
                    });*/
                }
            });
        }
        else {
            Session.set('login-required-msg', 'Please log in before participating in any events.');
            Router.go('/login');
        }

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
    'click #btn-remove-event': function(event){
        event.preventDefault();
        event.stopPropagation();
        Events.remove({ _id: this._id }, function(err, doc){
            if (err){
                console.log(err);
            }
            else {
                // done removing an event
            }
        });
    },
  'keyup #event-search-box': _.throttle(function(e) {
    var text = $(e.target).val().trim();
    EventSearch.search(text);
  }, 200)
});

Template.events.helpers({
    events: function(){
        return Events.find({}, {sort: {startTime: 1}}).map(function(event, num){
            event.readableStartTime = moment(event.startTime).format('MMMM Do YYYY, h:mm a');
            return event;
        });
    },
    myEvents: function(){
        var thisUserId = Meteor.userId();
        return Events.find({ownerId: Meteor.userId()}, {sort: {startTime: 1}}).map(function(event, num){
            event.readableStartTime = moment(event.startTime).format('MMMM Do YYYY, h:mm a');
            return event;
        });
    },
    isJoined: function(eventId){
        var attendees = Events.findOne(eventId).attendees;
        var thisUserId = Meteor.userId();
        var exist = attendees.indexOf(thisUserId);
        return (exist !== -1);
    },
    hasPassed: function(eventId){
        var currentTime =  new Date();
        var eventStartTime = this.startTime;
        return currentTime > eventStartTime;
    },
    getEvents: function() {
        var x = EventSearch.getData({
            transform: function(matchText, regExp) {
                return matchText.replace(regExp, "$&")
            },
            sort: {startTime: 1}
        });
        return x;
    },
    isLoading: function() {
        return EventSearch.getStatus().loading;
    }
});     