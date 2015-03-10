Template.notificationItem.helpers
  notificationPostPath: ->
    Router.routes.projectPage.path
      _id: @projectId

Template.notificationItem.events
  'click a': ->
    Notificationss.update @_id, 
      $set:
        read: true