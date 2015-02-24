Template.sidebar.helpers
  signedInUser: ->
    if Meteor.user()
      Meteor.user().username
    else
      null

Template.sidebar.events
  "click .msgnotifications-block": ->
    "use strict"
    setSessionForActiveNavTab "privateMessagesList"