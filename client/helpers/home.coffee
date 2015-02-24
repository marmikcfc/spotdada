Template.dashboard.rendered = () ->
  Tracker.autorun(() ->
    check Meteor.userId(), String
    Meteor.subscribe("posts",Meteor.userId())
    Meteor.subscribe("likes")
)

Template.dashboard.helpers
  'posts' : () -> Posts.find {parent:null}, {sort:{date: -1}}