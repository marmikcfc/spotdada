@Recipes = new Mongo.Collection("recipes")

Recipes.allow
  update: (userId, recipe) ->
    ownsRecipe userId, recipe
    
  remove: (userId, recipe) ->
    ownsRecipe userId, recipe

Recipes.deny
  update: (userId, recipe, fieldNames) ->
    console.log('recipe', recipe)
    console.log('fieldNames', fieldNames)
    _.without(fieldNames, "title", "desc", "tags", "src").length > 0

Meteor.methods

  postInsert: (postAttributes) ->
    check @userId, String
    check postAttributes,
      title: String
      desc: String
      tags: String
      src: String

    #postAttributes.tags = postAttributes.tags.split(/[ ,]+/)

    user = Meteor.user()
    recipe = _.extend(postAttributes,
      userId: user._id
      author: user.username
      submitted: new Date()
      commentsCount: 0
      upvoters: []
      votes: 0
    )
    recipeId = Recipes.insert(recipe)
    _id: recipeId

  upvote: (recipeId) ->
    check @userId, String
    check recipeId, String
    canVote = Recipes.update(
      _id: recipeId
      upvoters:
        $ne: @userId
    ,
      $addToSet:
        upvoters: @userId

      $inc:
        votes: 1
    )
    unless canVote
      throw new Meteor.Error("invalid", "You weren't able to upvote that post")

  downvote: (recipeId) ->
    check @userId, String
    check recipeId, String
    canRemoveVote = Recipes.update(
      _id: recipeId
      upvoters: @userId
    ,
      $pull:
        upvoters: @userId

      $inc:
        votes: -1
    )
    unless canRemoveVote
      throw new Meteor.Error("invalid", "You weren't able to remove upvote from the post") 
