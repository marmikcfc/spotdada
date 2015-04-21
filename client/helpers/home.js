Template.dashboard.rendered = function() {
  return Tracker.autorun(function() {
    check(Meteor.userId(), String);
Meteor.subscribeWithPagination("postss", Meteor.userId(), 1);
    return Meteor.subscribe("likes");
  });
};
Template.dashboard.helpers({
  
  'postss': function() {
//    Postss.loadNextPage();
    return Postss.find({
      parent: null
    }, {
      sort: {
        date: -1
      }
    });
  }
  
  
});
