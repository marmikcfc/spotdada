Template.postRecipe.events
  'click .customImageUploadBtn': (e)->
    e.preventDefault()
    document.getElementById("imageInput").click()



  'submit form': (e) ->
    e.preventDefault()
    projectImage = $(e.target).find('[name=imageInput]')[0].files[0]
    title = $(e.target).find('[name=title]').val()
    desc = $(e.target).find('#desc').html()
    tags = $(e.target).find('[name=tags]').val()
    console.log(desc.toString())
    reader = new FileReader()
    reader.onload = (e) ->
      project =
        title: title 
        desc: desc
        tags: tags
        src: e.target.result

      Meteor.call "postInsert", project, (error, result) ->
        Router.go "projectPage", 
          _id: result._id
        return

    if (projectImage)
      reader.readAsDataURL projectImage
      return
    else
      project =
        title: title 
        desc: desc
        tags: tags
        src: 'N/A'

      Meteor.call "postInsert", project, (error, result) ->
        Router.go "projectPage", 
          _id: result._id
        return

