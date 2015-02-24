Template.msgnotification.helpers({
    msgnotificationType: function (type) {
        "use strict";
        return type == this.type;
    },
    pm: function () {
        "use strict";
        return PrivateMessages.findOne({_id: this.pmId});
    },
    product: function () {
        "use strict";
        return Products.findOne({_id: this.productId});
    },
    author: function () {
        "use strict";
        var user = Users.findOne({_id: this.userId});
        if (user) {
            return user.username;
        }
    },
    user: function () {
        "use strict";
        var user = Users.findOne({_id: this.userId});
        if (user) {
            return user;
        }
    },
    msgnotification: function () {
        "use strict";
        var msgnotification = msgNotifications.findOne({_id: Template.parentData(1)._id});
        if (msgnotification) {
            return msgnotification;
        }
    }

});

Template.msgnotification.events({
    'click .mark-msgnotification-as-read': function () {
        "use strict";
        Meteor.call('markSinglemsgNotificationAsRead', Meteor.userId(), Template.currentData()._id, function (err) {
            if (err) {
                throwAlert('error', error.reason, error.details);
                return null;
            }
        });
    }
});