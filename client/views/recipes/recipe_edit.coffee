Template.recipeEdit.events
  'click .customImageUploadBtn': (e)->
      e.preventDefault()
      document.getElementById("imageInput").click()

  'submit form': (e) ->
    e.preventDefault()

    currentRecipeId = @_id
    console.log('currentRecipeId', currentRecipeId)

    recipeImage = $(e.target).find('[name=imageInput]')[0].files[0]
    title = $(e.target).find('[name=title]').val()
    desc = $(e.target).find('[name=desc]').val()
    tags = $(e.target).find('[name=tags]').val()

    if recipeImage
      reader = new FileReader()
      reader.onload = (e) ->

        recipe =
          title: title 
          desc: desc
          tags: tags
          src: e.target.result

        Recipes.update currentRecipeId,
          $set: recipe
        , (error) ->
          if error
            alert error.reason
          else
            Router.go "recipePage",
              _id: currentRecipeId
          return

      reader.readAsDataURL recipeImage
      return
    else 
      recipe =
        title: title 
        desc: desc
        tags: tags
        src: e.target.result

      console.log('Edit without image', recipe.tags)
      Recipes.update currentRecipeId,
        $set: recipe
      , (error) ->
        if error
          console.log('errrrrr', error)
          alert error.reason
        else
          console.log('Success', currentRecipeId)
          Router.go "recipePage",
            _id: currentRecipeId
        return
    return 

    Router.go "/"
    return

  'click .delete': (e) ->
    e.preventDefault()
    if confirm("Delete this recipe?")
      currentRecipeId = @_id
      Recipes.remove currentRecipeId
      Router.go "/"
    return


