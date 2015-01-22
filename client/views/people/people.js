Template.people.people = function(){
    return Meteor.users.find({ _id: { $ne: Meteor.userId()}});
};


Template.people.events({
    'click .add_friend': function(){
        Meteor.call('invite_new',this._id);
    }
});


