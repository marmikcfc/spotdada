Template.followers.helpers
  followersList: ->
    @.fetch().length > 0

Template.followings.helpers
  followingsList: ->
    @.fetch().length > 0