Template.profile.helpers
  email: ->
    @user.fetch()[0].emails[0].address

  username: ->
    @user.fetch()[0].username

  profile: ->
    @user.fetch()[0].profile

  notYourself: ->
    Meteor.user() and Meteor.userId() isnt @user.fetch()[0]._id

  canFollow: ->
    unless @user.fetch()[0].followers
      true
    else
      @user.fetch()[0].followers and @user.fetch()[0].followers.indexOf(Meteor.user().username) < 0

  upvotedClass: ->
    userId = Meteor.userId()
    if userId and not _.include(@upvoters, userId)
      "btn-primary upvotable"
    else
      "btn-warning downvotable"

  canVote: ->
    userId = Meteor.userId()
    if userId and not _.include(@upvoters, userId)
      true
    else
      false


Template.profile.events
  'click .follow': (e, template)->
    e.preventDefault()
#    target = template.data.username
    target=@user.fetch()[0].username
    console.log("Username is "+target)

    Meteor.call "follow", target, (error, target)->
      if error
        console.log(error.reason)
      else

  'click .unfollow': (e, template)->
    e.preventDefault()
#    target = template.data.username
    target=@user.fetch()[0].username

    Meteor.call "unfollow", target, (error, target)->
      if error
        console.log(error.reason)
      else

  'click .upvotable': (e)->
    e.preventDefault()
    Meteor.call 'upvote', @_id

  'click .downvotable': (e)->
    e.preventDefault()
    Meteor.call 'downvote', @_id