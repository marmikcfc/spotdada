Meteor.publish "posts",(userId) ->
  check userId, String
  check userId, Match.Any
  Posts.find({})


Meteor.publish "likes",() ->
  check postId, String
  check postId, Match.Any
  Likes.find({post:postId})
  Likes.find({})


Meteor.publish "all-events", ->
  Events.find {}

Meteor.publish "all-preprod", ->
  preFund.find {}

Meteor.publish "all-postprod", ->
  postFund.find {}

Meteor.publish "users-basic-info", ->
  Meteor.users.find {},
    fields:
      _id: 1
      username: 1
      emails: 1
      profile: 1
      privateMessages:1


Meteor.publish 'projects', (options)->
  check options,
    sort: Object
    limit: Number
  Projects.find {}, options

Meteor.publish 'oneRecipe', (id)->
  check id, String
  Projects.find id

Meteor.publish 'comments', (projectId)->
  check projectId, String
  Comments.find 
    projectId: projectId

Meteor.publish 'notifications', ->
  Notifications.find
    userId: @userId
    read:false

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

Meteor.publish 'myProjects', (username, options)->
  check username, String
  Projects.find
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
Meteor.publish 'followingProjects', (username, options)->
  thisUser = Followings.findOne(username: username)
  Projects.find
    author: 
      $in: thisUser.followings
  , options

###
Meteor.publish 'followingProjects', (username, options)->
  thisUser = Meteor.users.findOne(username: username)
  if thisUser and thisUser.followings
    Projects.find
      author: 
        $in: thisUser.followings
    , options
  else
    []

