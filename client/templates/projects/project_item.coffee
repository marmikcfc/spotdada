Template.projectItem.helpers
  projectAuthor: ->
    @userId is Meteor.userId()
  hasImage: ->
    @src isnt 'N/A'
  commentsCount: ->
    Comments.find(projectId: @_id).count()
  tags: ->
    @tags.split(/[ ,]+/)