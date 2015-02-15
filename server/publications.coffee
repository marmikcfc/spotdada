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

Meteor.publish "users-basic-info", ->
  Meteor.users.find {},
    fields:
      _id: 1
      emails: 1
      profile: 1

Meteor.publish "notifications", (userId) ->
  Notifications.find userId: userId

