@Comments = new Mongo.Collection("comments")

Comments.allow
  remove: (userId, comment) ->
    ownsComment userId, comment

Meteor.methods
  commentInsert: (commentAttributes)->
    check @userId, String
    check commentAttributes,
      recipeId: String
      commentBody: String

    user = Meteor.user()
    recipe = Recipes.findOne commentAttributes.recipeId

    unless recipe
      throw new Meteor.Error('invalid-comment', 'you must comment on a recipe')

    comment = _.extend(commentAttributes,
      userId: user._id
      commenter: user.username
      commented: new Date()
    )

    Recipes.update comment.recipeId,
      $inc:
        commentsCount: 1

    comment._id = Comments.insert comment

    createCommentNotification comment
    comment._id

  removeComment: (comment)->
    user = Meteor.user()

    if (user._id is comment.userId)
      Comments.remove comment._id

      Recipes.update comment.recipeId,
        $inc:
          commentsCount: -1