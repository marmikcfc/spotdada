Meteor.users.allow({
    insert: function (userId, doc) {
        return (userId === doc._id);
    },
    update: function (userId, doc, fields, modifier) {
        return userId === doc._id;
    }
});

Events.allow({
    insert: function(userId, doc){
        return userId;
    },
    remove: function(userId, doc){
        return (userId === doc.ownerId);
    },
    update: function(userId, doc, fields, modifier){
        return userId;
    }
});

Notifications.allow({
    insert: function (userId, doc) {
        return userId;
    },
    update: function (userId, doc, fields, modifier) {
        return userId;
    }
});
