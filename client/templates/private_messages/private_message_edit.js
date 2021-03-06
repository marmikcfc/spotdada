Template.privateMessageEdit.events({
    'submit form': function (e) {
        "use strict";
        e.preventDefault();

        var participants = Recipients.find().map(function (document) {
            return document.username;
        }), subject;
        participants.push(Meteor.user().username);

        subject = $(e.target).find('[name=subject]').val();

        if (!subject) {
            highlightErrorForField('#subject-input');
        }

        Meteor.call('updatePrivateMessage', this._id, subject, participants, function (error, privateMessageSlug) {
            if (error) {
                throwAlert('error', error.reason, error.details);
                return null;
            }
            Router.go('privateMessage', {slug: privateMessageSlug});
        });
    },
    'click #add-to-recipients-list': function () {
        "use strict";
        addToRecipientsList();
    },
    'click .remove-recipient': function (e) {
        "use strict";
        Session.set('recipientsStaleState', true);
        removeRecipient(e);
    }
});

Template.privateMessageEdit.helpers({
    recipients: function () {
        "use strict";
        if (Session.equals('recipientsStaleState', false)) {
            Users.find({_id: {$in: _.without(this.participants, Meteor.user()._id)}}).forEach(function (item) {
                if (Recipients.find({username: item.username}).count() === 0) {
                    Recipients.insert({username: item.username});
                }
            });
        }
        return Recipients.find().map(function (document, index) {
            document.index = index + 1;
            return document;
        });
    },
    totalParticipants: function () {
        "use strict";
        return Recipients.find().count();
    }
});

Template.privateMessageEdit.rendered = function () {
    "use strict";
    Session.set('recipientsStaleState', false);
};

Template.privateMessageEdit.destroyed = function () {
    "use strict";
    Session.set('recipientsStaleState', false);
};