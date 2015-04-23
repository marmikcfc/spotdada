@Projects = new Mongo.Collection("projects")

Projects.allow
  update: (userId, project) ->
    ownsRecipe userId, project
    
  remove: (userId, project) ->
    ownsRecipe userId, project

Projects.deny
  update: (userId, project, fieldNames) ->
    console.log('project', project)
    console.log('fieldNames', fieldNames)
    _.without(fieldNames, "title", "desc","designation", "tags", "src").length > 0

Meteor.methods

  postInsert: (postAttributes) ->
    check @userId, String
    check postAttributes,
      title: String
      desc: String
      designation: String
      tags: String
      src: String

    #postAttributes.tags = postAttributes.tags.split(/[ ,]+/)

    user = Meteor.user()
    project = _.extend(postAttributes,
      userId: user._id
      author: user.username
      submitted: new Date()
      commentsCount: 0
      upvoters: []
      votes: 0
    )
    projectId = Projects.insert(project)
    _id: projectId

  upvote: (projectId) ->
    check @userId, String
    check projectId, String
    canVote = Projects.update(
      _id: projectId
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

  downvote: (projectId) ->
    check @userId, String
    check projectId, String
    canRemoveVote = Projects.update(
      _id: projectId
      upvoters: @userId
    ,
      $pull:
        upvoters: @userId

      $inc:
        votes: -1
    )
    unless canRemoveVote
      throw new Meteor.Error("invalid", "You weren't able to remove upvote from the post") 
