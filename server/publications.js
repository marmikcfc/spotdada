
Meteor.reactivePublish('privateMessages', function (userId) {
    "use strict";
    var user = Users.findOne({_id: userId}, {reactive: true});
    if (user) {
        return PrivateMessages.find({_id: {$in: user.privateMessages}}, {reactive: true});
    }
    this.ready();
});


Meteor.publish('privateMessage', function (slug) {
    "use strict";
    var pm = PrivateMessages.find({slug: slug});
    if (pm.count() > 0) {
        return pm;
    }
    this.ready();
});


Meteor.publish('privateMessageParticipants', function (slug) {
    "use strict";
    var pm = PrivateMessages.find({slug: slug}, {fields: {'participants': 1}});
    if (pm.count() > 0) {
        return pm;
    }
    this.ready();
});

Meteor.publish('participantsAvatars', function (slug) {
    "use strict";
    var pm = PrivateMessages.findOne({slug: slug});
    if (pm) {
        return Users.find({_id: {$in: pm.participants}}, {
            fields: {
                'profile.image': 1,
                'username': 1,
                'profile.online': 1,
                'profile.color': 1
            }
        });
    }
    this.ready();
});

Meteor.reactivePublish('allParticipantsAvatarsInvolved', function (userId) {
    "use strict";
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

Meteor.publish('usernames', function () {
    "use strict";
    return Users.find({}, {
        fields: {'username': 1}
    });
});
