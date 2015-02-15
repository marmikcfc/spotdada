Template.projectPage.helpers
  comments: ->
    Comments.find
      projectId: @_id
