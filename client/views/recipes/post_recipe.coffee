Template.postRecipe.events
  'click .customImageUploadBtn': (e)->
    e.preventDefault()
    document.getElementById("imageInput").click()

  'submit form': (e) ->
    e.preventDefault()

    recipeImage = $(e.target).find('[name=imageInput]')[0].files[0]
    title = $(e.target).find('[name=title]').val()
    desc = $(e.target).find('[name=desc]').val()
    tags = $(e.target).find('[name=tags]').val()
 
    reader = new FileReader()
    reader.onload = (e) ->
      recipe =
        title: title 
        desc: desc
        tags: tags
        src: e.target.result

      Meteor.call "postInsert", recipe, (error, result) ->
        Router.go "recipePage", 
          _id: result._id
        return

    if (recipeImage)
      reader.readAsDataURL recipeImage
      return
    else
      recipe =
        title: title 
        desc: desc
        tags: tags
        src: 'N/A'

      Meteor.call "postInsert", recipe, (error, result) ->
        Router.go "recipePage", 
          _id: result._id
        return

