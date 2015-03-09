Template.myBlogIndexTemplate.events

  'click .for-new-blog': (e, tpl) ->
    e.preventDefault()

    Router.go 'blogAdminEdit', id: Random.id()