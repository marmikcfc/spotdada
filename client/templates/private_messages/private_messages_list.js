Template.privateMessagesList.helpers({
    noPrivateMessages: function () {
        "use strict";
        return Meteor.user().privateMessages.length === 0;
    },
    privateMessages: function () {
        "use strict";
        return PrivateMessages.find({_id: {$in: Meteor.user().privateMessages}}, {sort: {lastModified: -1}});
    }
});

Template.privateMessagesList.rendered = function () {
    "use strict";
    Session.set('activeNavTab', 'privateMessagesList');
};

Template.privateMessagesList.destroyed = function () {
    "use strict";
    Session.set('activeNavTab', null);
};