Template.peopleAudio.events({
    'click .select_song': function(e){
        Player.set_index(this._id);
        Player.select_song(this.url(),this.name(), $(e.currentTarget));
    },
    'keyup .search_song': function(e){
        var query = $(e.currentTarget).val();
        Session.set('audio_search',query);
    }
});

Template.peopleAudio.helpers({
    audio: function(){
        if(Session.get('audio_search'))
            return AudioFS.find({$and: [{ owner: currentProfile()._id,'original.name': new RegExp(Session.get('audio_search'),'i')} ]},{order:{uploadedAt: 1}});
        return AudioFS.find({owner: currentProfile()._id},{sort:{uploadedAt: 1}});
    }
});
Template.peopleAudio.rendered = function(){
    Player.user_id = currentProfile()._id;
};

currentProfile = function(){
    return Meteor.users.findOne(Router.current().params._id);
};