Template.dashboard.rendered = () ->
  Tracker.autorun(() ->
    check Meteor.userId(), String
    Meteor.subscribe("postss",Meteor.userId())
    Meteor.subscribe("likes")
)

Template.dashboard.helpers
  'postss' : () -> Postss.find {parent:null}, {sort:{date: -1}}