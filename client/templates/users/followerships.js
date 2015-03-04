Template.followers.helpers({
  followersList: function() {
  	console.log(this.fetch().length);
    return this.fetch().length > 0;
  }
});
Template.followings.helpers({
  followingsList: function() {
    return this.fetch().length > 0;
  }
});