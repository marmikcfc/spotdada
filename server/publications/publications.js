/*Meteor.publish("postss", function(userId) {
  check(userId, String);
  check(userId, Match.Any);
  return Postss.find({}, {
    limit: limit
  });
}); */


Meteor.publish('notificationss', function() {
 return Notificationss.find({
    userId: this.userId,
    read: false
  });
});



Meteor.publish('usernamesRoles', function () {
    "use strict";
    return Users.find({}, {
        fields: {'username': 1, 'roles': 1}
    });
});



Meteor.publish('msgnotifications', function (id) {
    "use strict";
    return msgNotifications.find({_id: {$in: id}});
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

    return Users.find({username: username}, {fields: {'profile': 1, 'username': 1, 'roles': 1}});
});

Meteor.reactivePublish('privateMessages', function (userId) {
    "use strict";
      check(userId, String);

    var user = Users.findOne({_id: userId}, {reactive: true});
    if (user) {
        return PrivateMessages.find({_id: {$in: user.privateMessages}});
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

    var pm = PrivateMessages.find({slug: slug});
    if (pm.count() > 0) {
        return pm;
    }
    this.ready();
});


Meteor.publish('privateMessageParticipants', function (slug) {
    "use strict";
      check(slug, String);

    var pm = PrivateMessages.find({slug: slug}, {fields: {'participants': 1}});
    if (pm.count() > 0) {
        return pm;
    }
    this.ready();
});

Meteor.publish('participantsAvatars', function (slug) {
    "use strict";
      check(slug, String);

    var pm = PrivateMessages.findOne({slug: slug});
    if (pm) {
        return Users.find({_id: {$in: pm.participants}}, {
            fields: {
                'profile.image': 1,
                'username': 1
            }
        });
    }
    this.ready();
});

Meteor.reactivePublish('allParticipantsAvatarsInvolved', function (userId) {
    "use strict";
      check(userId, String);

    var user = Users.findOne({_id: userId}, {reactive: true}),
        participantsArr;
    if (user) {
        participantsArr = [];
        PrivateMessages.find({_id: {$in: user.privateMessages}}, {reactive: true}).forEach(function (message) {
            participantsArr = _.union(participantsArr, message.participants);
        });
        return Users.find({_id: {$in: participantsArr}}, {
            fields: {
                'profile.image': 1,
                'username': 1,
                'profile.online': 1,
                'profile.color': 1
            }
        }, {reactive: true});
    }
    this.ready();
});



Meteor.publish('invitationsPM', function (slug) {
    "use strict";
      check(slug, String);

    var pm = PrivateMessages.findOne({slug: slug}),
        invIds = [];
    if (pm) {
    
        if (invIds.length > 0) {
            return Invitations.find({_id: {$in: invIds}});
        }
    }
    this.ready();
});

Meteor.publish('ownUser', function (id) {
    "use strict";
      check(id, String);

    return Users.find({_id: id});
});
