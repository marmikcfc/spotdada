Template.my_audio.events({
    'change .fileUploader': function (event) {
        var fsFile = new FS.File(event.target.files[0]);
        user_id = Meteor.userId();
        fsFile.owner = user_id;
        AudioFS.insert(fsFile, function (err,s) {
            if (err) throw err;
        });

    },
    'click .remove_audio': function () {
        AudioFS.remove({_id: this._id})
    },
    'click .select_song': function(e){
        Player.set_index(this._id);
        Player.select_song(this.url(),this.name(), $(e.currentTarget));
    },
    'keyup .search_song': function(e){
        var query = $(e.currentTarget).val();
        Session.set('audio_search',query);
    }
});

Template.my_audio.helpers({
    audio: function(){
        if(Session.get('audio_search') && Session.get('friend_audio'))
            return AudioFS.find({$and:[ {'original.name': new RegExp(Session.get('audio_search'),'i')},{owner: Session.get('friend_audio') }]}, {sort:{uploadedAt: 1}});
        if(Session.get('audio_search'))
            return AudioFS.find({$and:[ {'original.name': new RegExp(Session.get('audio_search'),'i')},{owner: Meteor.userId() }]}, {sort:{uploadedAt: 1}});
        if(Session.get('friend_audio'))
            return AudioFS.find({owner: Session.get('friend_audio') },{sort:{uploadedAt: -1}});
        return AudioFS.find({owner: Meteor.userId()}, {sort: {uploadedAt: -1}});
    }
});
Template.my_audio.rendered = function(){
    Player.user_id = Meteor.userId();
};


