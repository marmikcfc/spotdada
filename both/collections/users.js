Users = Meteor.users;

// deny permission
denyPermission = function () {
    "use strict";
    return true;
};

EasySearch.createSearchIndex('users', {
    'field': ['username'],
    'collection': Users,
    'limit': 20,
    'query': function (searchString) {
        // Default query that will be used for searching
        var query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);
        // Do not include own user in search
        if (Meteor.user()) {
            query.username = {$ne: Meteor.user().username};
        }
        return query;
    }
});

Users.deny({
    insert: denyPermission,
    update: denyPermission,
    remove: denyPermission
});


Meteor.methods({
    markAllmsgNotificationsAsRead: function (userId) {
        "use strict";
        if (Meteor.isServer) {
            var usermsgNotifications = Users.findOne({_id: userId}).msgnotifications;
            // removing all references
            Users.update({_id: userId}, {$set: {msgnotifications: []}});
            _.each(usermsgNotifications, function (item) {
                if (Users.find({msgnotifications: {$in: [item]}}).count() === 0) {
                    // no users with this notification -> delete main notification
                    msgNotifications.remove({_id: item});
                }
            });
        }
    },
    markSinglemsgNotificationAsRead: function (userId, msgnotificationId) {
        "use strict";
        if (Meteor.isServer) {
            // removing reference
            Users.update({_id: userId}, {$pull: {msgnotifications: msgnotificationId}});
            if (Users.find({msgnotifications: {$in: [msgnotificationId]}}).count() === 0) {
                // no users with this notification -> delete main notification
                msgNotifications.remove({_id: msgnotificationId});
            }
        }
    }
});

