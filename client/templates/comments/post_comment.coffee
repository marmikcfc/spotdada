Template.postcom.events
  'submit form': (e, template)->
    e.preventDefault()

    $body = $(e.target).find('[name=commentBody]')
    comment =
      commentBody: $body.val()
      projectId: template.data._id

    unless comment.commentBody
      console.log('No body bro!')

    Meteor.call "commentInsert", comment, (error, commentId)->
      if error
        throwError error.reason
      else
        $body.val ""