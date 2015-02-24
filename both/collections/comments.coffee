@Comments = new Mongo.Collection("comments")

Comments.allow
  remove: (userId, comment) ->
    ownsComment userId, comment

Meteor.methods
  commentInsert: (commentAttributes)->
    check @userId, String
    check commentAttributes,
      projectId: String
      commentBody: String

    user = Meteor.user()
    project = Projects.findOne commentAttributes.projectId

    unless project
      throw new Meteor.Error('invalid-comment', 'you must comment on a project')

    comment = _.extend(commentAttributes,
      userId: user._id
      commenter: user.username
      commented: new Date()
    )

    Projects.update comment.projectId,
      $inc:
        commentsCount: 1

    comment._id = Comments.insert comment

    createCommentNotification comment
    comment._id

  removeComment: (comment)->
    user = Meteor.user()

    if (user._id is comment.userId)
      Comments.remove comment._id

      Projects.update comment.projectId,
        $inc:
          commentsCount: -1