Template.commentItem.helpers
  readableDate: ->
    @commented.toString()

  commentAuthor: ->
    @userId is Meteor.userId()

Template.commentItem.events
  'click .deleteComment': (e) ->
    e.preventDefault()
    if confirm("Delete this comment?")

      comment = @

      Meteor.call "removeComment", comment, (error, commentId)->
        if error
          throwError error.reason