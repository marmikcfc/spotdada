@Notifications = new Mongo.Collection("notifications")

Notifications.allow
  update: (userId, doc, fieldNames)->
    ownsRecipe(userId, doc) and fieldNames.length is 1 and fieldNames[0] is 'read'

@createCommentNotification = (comment)->
  recipe = Recipes.findOne comment.recipeId

  if comment.userId isnt recipe.userId
    Notifications.insert
      userId: recipe.userId
      recipeId: recipe._id
      commentId: comment._id
      commenter: comment.commenter
      read: false