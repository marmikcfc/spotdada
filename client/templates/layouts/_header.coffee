Template._header.helpers
  signedInUser: ->
    if Meteor.user()
      Meteor.user().username
    else
      null
  msgnotificationCount: ->
    "use strict"
    return 0  if Meteor.user().msgnotifications is `undefined` or Meteor.user().msgnotifications.length is 0
    if Meteor.user().msgnotifications.length > 0
      msgNotifications.find(_id:
        $in: Meteor.user().msgnotifications
      ).count()

Template._header.events
  "click .msgnotifications-block": ->
    "use strict"
    setSessionForActiveNavTab "privateMessagesList"

  "click .messages-block": ->
    "use strict"
    Meteor.call "markAllmsgNotificationsAsRead", Meteor.userId(), (err) ->
      if err
        throwAlert "error", error.reason, error.details
        null

