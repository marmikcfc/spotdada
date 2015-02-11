Template.recipeItem.helpers
  recipeAuthor: ->
    @userId is Meteor.userId()
  hasImage: ->
    @src isnt 'N/A'
  commentsCount: ->
    Comments.find(recipeId: @_id).count()
  tags: ->
    @tags.split(/[ ,]+/)