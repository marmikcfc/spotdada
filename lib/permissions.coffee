@ownsRecipe = (userId, project) ->
  project and project.userId is userId

@ownsComment = (userId, comment) ->
  comment and comment.userId is userId