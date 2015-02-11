@ownsRecipe = (userId, recipe) ->
  recipe and recipe.userId is userId

@ownsComment = (userId, comment) ->
  comment and comment.userId is userId