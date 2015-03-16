/*Template.dashboard.rendered = function() {
  return Tracker.autorun(function() {
    check(Meteor.userId(), String);
    var postHandle=Meteor.subscribe("postss", Meteor.userId());
    return Meteor.subscribe("likes");
  });
};
Template.dashboard.helpers({
  
  'postss': function() {
    return Postss.find({
      parent: null
    }, {
      sort: {
        date: -1
      }
    });
  }
});*/