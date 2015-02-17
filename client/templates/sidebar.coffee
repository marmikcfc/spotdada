Template.sidebar.helpers
  signedInUser: ->
    if Meteor.user()
      Meteor.user().username
    else
      null