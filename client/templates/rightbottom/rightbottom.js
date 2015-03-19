Template.rightbottom.helpers({
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
