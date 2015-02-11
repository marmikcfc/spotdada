Meteor.publish 'recipes', (options)->
  check options,
    sort: Object
    limit: Number
  Recipes.find {}, options

Meteor.publish 'oneRecipe', (id)->
  check id, String
  Recipes.find id

Meteor.publish 'comments', (recipeId)->
  check recipeId, String
  Comments.find 
    recipeId: recipeId

Meteor.publish 'notifications', ->
  Notifications.find
    userId: @userId
    read: false

Meteor.publish 'oneUser', (username)->
  check username, String
  Meteor.users.find 
    username: username

Meteor.publish 'followers', (username)->
  check username, String
  Meteor.users.find
    followings: username

Meteor.publish 'followings', (username)->
  check username, String
  Meteor.users.find
    followers: username

Meteor.publish 'myRecipes', (username, options)->
  check username, String
  Recipes.find
    author: username
  , options
###
Meteor.publish 'myFollowers', (username)->
  check username, String
  Followers.find
    username: username

Meteor.publish 'myFollowings', (username)->
  check username, String
  Followings.find
    username: username
###

### Followership
Meteor.publish 'followingRecipes', (username, options)->
  thisUser = Followings.findOne(username: username)
  Recipes.find
    author: 
      $in: thisUser.followings
  , options

###
Meteor.publish 'followingRecipes', (username, options)->
  thisUser = Meteor.users.findOne(username: username)
  if thisUser and thisUser.followings
    Recipes.find
      author: 
        $in: thisUser.followings
    , options
  else
    []
