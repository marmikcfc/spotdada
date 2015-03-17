#Template.dashboard.rendered = () ->
#  Tracker.autorun(() ->
#    check Meteor.userId(), String
#    Meteor.subscribeWithPagination("postss",Meteor.userId(),5)
#    Meteor.subscribe("likes")
#)

#Template.dashboard.helpers
#S  'postss' : () -> Postss.findFaster {parent:null}, {sort:{date: -1}}
                   