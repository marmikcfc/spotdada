Template.dashboard.events({
  
  'click .customImageUploadBtn': (e)->
    e.preventDefault()
    document.getElementById("imageInput").click()
  

  'submit form.postStatus': (evt,tmpl) ->
    evt.preventDefault()
    evt.preventDefault()
    projectImage = $(evt.target).find('[name=imageInput]')[0].files[0]
    reader = new FileReader()
    reader.onload = (e) ->

      post = {
        text: $(evt.target).find('input[name=postStatus]').val(),
        parent: null,
        img: e.target.result
      }
      $(evt.target).find('input[name=postStatus]').val('').focus()
      Meteor.call('addPost',post, (err,result) ->
        alert(error.reason) if err
      )
    if (projectImage)
      reader.readAsDataURL projectImage
      return
    else
      post = 
        text: $(evt.target).find('input[name=postStatus]').val(),
        parent: null,
        img: ''
      Meteor.call('addPost',post, (err,result) ->
        alert(error.reason) if err
      )
})
