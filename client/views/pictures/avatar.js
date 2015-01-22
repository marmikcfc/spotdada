Template.avatar.events({
    'change .fileUploader': function (event) {
        var fsFile = new FS.File(event.target.files[0]);
        user_id = Meteor.userId();
        fsFile.owner = user_id;
        ImagesFS.insert(fsFile, function (err,s) {
            if (err) throw err;
            Meteor.call('set_avatar', s._id, user_id);
        });

    },
    'click .deleteFile': function () {
        ImagesFS.remove({_id: this._id})
    },
    'click #avatar_modal_wrapper':function(){
        $('#avatar_modal, #avatar_modal_wrapper').remove();
    },
    'click .remove_image': function(){
        ImagesFS.remove(this._id);
    }

});

Template.avatar.helpers({
    files: function(){
        return ImagesFS.find({uploadedAt:{ $gt: new Date()}},{limit:1});
    }
});