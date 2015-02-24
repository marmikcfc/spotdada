Template.msgnotifications.helpers({
    msgnotifications: function () {
        "use strict";
        if (Meteor.user().msgnotifications === undefined) {
            return null;
        }
        return msgNotifications.find({_id: {$in: Meteor.user().msgnotifications}}, {sort: {submitted: -1}});
    },
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

Template.msgnotifications.events({
    'click .mark-all-msgnotifications-as-read a': function () {
        "use strict";
        Meteor.call('markAllmsgNotificationsAsRead', Meteor.userId(), function (err) {
            if (err) {
                throwAlert('error', error.reason, error.details);
                return null;
            }
        });
    }
});