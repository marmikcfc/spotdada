Template.notificationss.helpers
  notifications: ->
    Notificationss.find
      userId: Meteor.userId()
      read: false

  notificationCount: ->
    Notificationss.find(
      userId: Meteor.userId()
      read: false
    ).count()