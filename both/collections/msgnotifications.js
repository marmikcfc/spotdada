msgNotifications = new Meteor.Collection('msgnotifications');

ownsDocument = function (userId, doc) {
    "use strict";
    return doc && doc.userId === userId;
};

// deny permission
denyPermission = function () {
    "use strict";
    return true;
};

allowPermission = function () {
    "use strict";
    return true;
};

msgNotifications.allow({
    insert: ownsDocument,
    remove: allowPermission
});

msgNotifications.deny({
    update: denyPermission
});