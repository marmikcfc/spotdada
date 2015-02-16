Meteor.subscribe('users-basic-info');


Template.profile.rendered = function(){
    $('ul li.active').removeClass('active');
 //   var def= '/public/images/default.jpg';
};


Template.profile.helpers({
 /* email: function() {
    return this.user.fetch()[0].emails[0].address;
  },
  */
  bio: function() {
    console.log("trying to get the username");
    var us= Meteor.user.fetch()[0].username;
    console.log("USername"+us);
    return us;
  },
  avatar: function() {
    return this.user.fetch()[0].profile.avatar;
  }, 
  username: function() {
     console.log("trying to get the bio");
//     return Meteor.users.findOne(userId).profile.bio;
  },
/*  firstname: function() {
    return this.user.fetch()[0].firstname;
  }, */
  notYourself: function() {
    return Meteor.user() && Meteor.userId() !== Meteor.user.fetch()[0]._id;
  },
  canFollow: function() {
    if (!this.user.fetch()[0].followers) {
      return true;
    } else {
      return this.user.fetch()[0].followers && this.user.fetch()[0].followers.indexOf(Meteor.user().username) < 0;
    }
  },
  upvotedClass: function() {
    var userId;
    userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return "btn-primary upvotable";
    } else {
      return "btn-warning downvotable";
    }
  },
  canVote: function() {
    var userId;
    userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return true;
    } else {
      return false;
    }
  }
});
Template.profile.events({
  'click .follow': function(e, template) {
    var target;
    e.preventDefault();
    target = this.user.fetch()[0].username;
    console.log("Username is " + target);
    return Meteor.call("follow", target, function(error, target) {
      if (error) {
        return console.log(error.reason);
      } else {

      }
    });
  },
  'click .unfollow': function(e, template) {
    var target;
    e.preventDefault();
    target = this.user.fetch()[0].username;
    return Meteor.call("unfollow", target, function(error, target) {
      if (error) {
        return console.log(error.reason);
      } else {

      }
    });
  },
  'click .upvotable': function(e) {
    e.preventDefault();
    return Meteor.call('upvote', this._id);
  },
  'click .downvotable': function(e) {
    e.preventDefault();
    return Meteor.call('downvote', this._id);
  }
});




/*Template.profile.helpers({
  'getUserAvatar': function(userId) {
    console.log("INTO USER AVATAR");
    return Meteor.users.findOne(userId).profile.avatar;
  }
});


*/