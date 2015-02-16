Meteor.subscribe('users-basic-info');

Template.post.helpers({
  'getUserAvatar': function(userId) {
 /*   console.log("INTO USER AVATAR"); */
    return Meteor.users.findOne(userId).profile.avatar;
  }
});


Template.postComment.helpers({
  'getUserAvatar': function(userId) {
//    console.log("INTO USER AVATAR");
    return Meteor.users.findOne(userId).profile.avatar;
  }
});



