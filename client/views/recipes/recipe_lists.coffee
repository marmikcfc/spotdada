Template.recipeLists.helpers
  upvotedClass: ->
    userId = Meteor.userId()
    if userId and not _.include(@upvoters, userId)
      "btn-primary upvotable"
    else
      "btn-warning downvotable"

  canVote: ->
    userId = Meteor.userId()
    if userId and not _.include(@upvoters, userId)
      true
    else
      false


Template.recipeLists.events
  'click .upvotable': (e)->
    e.preventDefault()
    Meteor.call 'upvote', @_id

  'click .downvotable': (e)->
    e.preventDefault()
    Meteor.call 'downvote', @_id
