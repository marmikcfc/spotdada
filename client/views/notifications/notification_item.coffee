Template.notificationItem.helpers
  notificationPostPath: ->
    Router.routes.recipePage.path
      _id: @recipeId

Template.notificationItem.events
  'click a': ->
    Notifications.update @_id, 
      $set:
        read: true