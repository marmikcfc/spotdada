Template.recipePage.helpers
  comments: ->
    Comments.find
      recipeId: @_id
