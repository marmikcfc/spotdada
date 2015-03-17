#Meteor.publish "postss", (userId, limit) ->
#  check userId, String
#  check userId, Match.Any
#  Postss.find {},
#    limit: limit


Meteor.publish "postss",(userId,limit) ->
  check userId, String
  check userId, Match.Any
  Postss.findFaster({},{sort: {date: -1}},{limit: limit})
  
  
# Meteor.publish "likes",() ->
#  check postId, Match.Any
#  Likes.find({post:postId})
# Likes.find({})


Meteor.publish "all-events", ->
  Events.findFaster {}

Meteor.publish "all-preprod", ->
  preFund.findFaster {}

Meteor.publish "all-postprod", ->
  postFund.findFaster {}

Meteor.publish "users-basic-info", ->
  @unblock()
  Meteor._sleepForMs(600)
  Meteor.users.findFaster {},
    fields:
      _id: 1
      username: 1
      emails: 1
      profile: 1
      privateMessages:1
      msgnotifications:1


Meteor.publish 'projects', (options)->
  check options,
    sort: Object
    limit: Number
  Projects.findFaster {}, options

Meteor.publish 'oneRecipe', (id)->
  check id, String
  Projects.findFaster id

Meteor.publish 'comments', (projectId)->
  check projectId, String
  Comments.findFaster 
    projectId: projectId

#Meteor.publish 'notifications', ->
#  check
#  Notifications.find
#    userId: @userId
#    read:false

Meteor.publish 'oneUser', (username)->
  check username, String
  Meteor.users.findFaster
    username: username

Meteor.publish 'followers', (username)->
  check username, String
  Meteor.users.findFaster
    followings: username
  

Meteor.publish 'followings', (username)->
  check username, String
  Meteor.users.findFaster
    followers: username

Meteor.publish 'myProjects', (username, options)->
  check username, String
  Projects.findFaster
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
  thisUser = Meteor.users.findOneFaster(username: username)
  if thisUser and thisUser.followings
    Projects.findFaster
      author: 
        $in: thisUser.followings
    , options
  else
    []

