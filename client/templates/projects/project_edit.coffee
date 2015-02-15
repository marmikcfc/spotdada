Template.projectEdit.events
  'click .customImageUploadBtn': (e)->
      e.preventDefault()
      document.getElementById("imageInput").click()

  'submit form': (e) ->
    e.preventDefault()

    currentRecipeId = @_id
    console.log('currentRecipeId', currentRecipeId)

    projectImage = $(e.target).find('[name=imageInput]')[0].files[0]
    title = $(e.target).find('[name=title]').val()
    desc = $(e.target).find('[name=desc]').val()
    tags = $(e.target).find('[name=tags]').val()

    if projectImage
      reader = new FileReader()
      reader.onload = (e) ->

        project =
          title: title 
          desc: desc
          tags: tags
          src: e.target.result

        Projects.update currentRecipeId,
          $set: project
        , (error) ->
          if error
            alert error.reason
          else
            Router.go "projectPage",
              _id: currentRecipeId
          return

      reader.readAsDataURL projectImage
      return
    else 
      project =
        title: title 
        desc: desc
        tags: tags
        src: e.target.result

      console.log('Edit without image', project.tags)
      Projects.update currentRecipeId,
        $set: project
      , (error) ->
        if error
          console.log('errrrrr', error)
          alert error.reason
        else
          console.log('Success', currentRecipeId)
          Router.go "projectPage",
            _id: currentRecipeId
        return
    return 

    Router.go "/"
    return

  'click .delete': (e) ->
    e.preventDefault()
    if confirm("Delete this project?")
      currentRecipeId = @_id
      Projects.remove currentRecipeId
      Router.go "/"
    return


