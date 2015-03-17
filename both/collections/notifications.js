Notificationss = new Meteor.Collection('notificationss');

Notificationss.allow({
  update: function(userId, doc, fieldNames) {
    return ownsRecipe(userId, doc) && fieldNames.length === 1 && fieldNames[0] === 'read';
  }
});
this.createCommentNotification = function(comment) {
  var project;
  project = Projects.findOneFaster(comment.projectId);
  if (comment.userId !== project.userId) {
    return Notificationss.insert({
      userId: project.userId,
      projectId: project._id,
      commentId: comment._id,
      commenter: comment.commenter,
      read: false
    });
  }

/*events = events.findOne(comment.eventsId);
   if (comment.userId !== events.userId) {
    return Notifications.insert({
      userId: events.userId,
      projectId: events._id,
      commenter: comment.commenter,
      read: false
    });
  }*/
};


this.createEventCommentNotification = function() {
/*events = events.findOne(ev.eventsId);
   if (ev.userId !== events.userId) {
    return Notifications.insert({
      userId: events.userId,
      projectId: events._id,
      commentId:'',
      commenter: ev.commenter,
      read: false
    });
  }*/

console.log("IT FIRES");

};