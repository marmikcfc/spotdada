Invitations = new Meteor.Collection('invitations');


// deny permission
denyPermission = function () {
    "use strict";
    return true;
};

allowPermission = function () {
    "use strict";
    return true;
};

Invitations.allow({
    insert: allowPermission,
    update: allowPermission,
    remove: allowPermission
});