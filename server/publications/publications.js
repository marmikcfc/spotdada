/*Meteor.publish("postss", function(userId) {
  check(userId, String);
  check(userId, Match.Any);
  return Postss.find({}, {
    limit: limit
  });
}); */


Meteor.publish('notificationss', function() {
 return Notificationss.findFaster({
    userId: this.userId,
    read: false
  });
});



Meteor.publish('usernamesRoles', function () {
    "use strict";
    return Users.findFaster({}, {
        fields: {'username': 1, 'roles': 1}
    });
});



Meteor.publish('msgnotifications', function (id) {
    "use strict";
    return msgNotifications.findFaster({_id: {$in: id}});
});

Meteor.publish(null, function () {
    "use strict";
    return Users.find({_id: this.userId}, {
        fields: {
            msgnotifications: 1,
            'privateMessages': 1
        }
    });
});

Meteor.publish('userProfile', function (username) {
    "use strict";
      check(username, String);
     this.unblock();
    Meteor._sleepForMs( 60 * 60);
    return Users.findFaster({username: username}, {fields: {'profile': 1, 'username': 1, 'roles': 1}});
});

Meteor.publish('privateMessages', function (userId) {
    "use strict";
      check(userId, String);

    var user = Users.findOneFaster({_id: userId});
    if (user) {
        return PrivateMessages.findFaster({_id: {$in: user.privateMessages}});
    }
    this.ready();
});


Meteor.publish('usernames', function () {
    "use strict";
  
    return Users.find({}, {
        fields: {'username': 1}
    });
});

Meteor.publish('privateMessage', function (slug) {
    "use strict";
  
      check(slug, String);

    var pm = PrivateMessages.findFaster({slug: slug});
    if (pm.count() > 0) {
        return pm;
    }
    this.ready();
});


Meteor.publish('privateMessageParticipants', function (slug) {
    "use strict";
      check(slug, String);
 this.unblock();
    Meteor._sleepForMs(60 * 60);
    var pm = PrivateMessages.findFaster({slug: slug}, {fields: {'participants': 1}});
    if (pm.count() > 0) {
        return pm;
    }
    this.ready();
});

Meteor.publish('participantsAvatars', function (slug) {
    "use strict";
      check(slug, String);
  
     this.unblock();
    Meteor._sleepForMs(60 * 60);
  
  var pm = PrivateMessages.findOneFaster({slug: slug});
    if (pm) {
        return Users.findFaster({_id: {$in: pm.participants}}, {
            fields: {
                'profile.image': 1,
                'username': 1
            }
        });
    }
    this.ready();
});

Meteor.publish('allParticipantsAvatarsInvolved', function (userId) {
    "use strict";
      check(userId, String);

    var user = Users.findOneFaster({_id: userId}),
        participantsArr;
    if (user) {
        participantsArr = [];
        PrivateMessages.findFaster({_id: {$in: user.privateMessages}}).forEach(function (message) {
            participantsArr = _.union(participantsArr, message.participants);
        });
        return Users.findFaster({_id: {$in: participantsArr}}, {
            fields: {
                'profile.image': 1,
                'username': 1
            }
        });
    }
    this.ready();
});



Meteor.publish('invitationsPM', function (slug) {
    "use strict";
      check(slug, String);

    var pm = PrivateMessages.findOneFaster({slug: slug}),
        invIds = [];
    if (pm) {
    
        if (invIds.length > 0) {
            return Invitations.findFaster({_id: {$in: invIds}});
        }
    }
    this.ready();
});

Meteor.publish('ownUser', function (id) {
    "use strict";
      check(id, String);
       this.unblock();
    Meteor._sleepForMs(60 * 60);
    return Users.findFaster({_id: id});
});