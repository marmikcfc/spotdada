Template.home.rendered = () ->
  Tracker.autorun(() ->
    check Meteor.userId(), String
    Meteor.subscribe("posts",Meteor.userId())
    Meteor.subscribe("likes")
)

Template.home.helpers
  'posts' : () -> Posts.find {parent:null}, {sort:{date: -1}}