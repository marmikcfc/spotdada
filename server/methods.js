Meteor.methods({
    'avatar-upload': function (userId, fileInfo, fileData) {
        Meteor.users.update({_id: userId}, {
            $set: {
                "profile.avatar": fileData
            }
        });
    }
});