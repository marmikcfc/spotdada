Template.notifications.helpers
  notifications: ->
    Notifications.find
      userId: Meteor.userId()
      read: false

  notificationCount: ->
    Notifications.find(
      userId: Meteor.userId()
      read: false
    ).count()