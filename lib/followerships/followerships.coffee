
Meteor.methods
  follow: (target) ->
    check @userId, String
    check target, String

    myself = Meteor.users.findOne Meteor.userId()

    if myself
      Meteor.users.update
        _id: Meteor.userId()
      , 
        $addToSet:
          followings: target

      Meteor.users.update
        username: target
      , 
        $addToSet:
          followers: Meteor.user().username

  unfollow: (target) ->
    check @userId, String
    check target, String

    myself = Meteor.users.findOne Meteor.userId()

    if myself
      Meteor.users.update
        _id: Meteor.userId()
      , 
        $pull:
          followings: target

      Meteor.users.update
        username: target
      , 
        $pull:
          followers: Meteor.user().username