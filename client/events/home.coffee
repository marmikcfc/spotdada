Template.home.events({
  'submit form.postStatus': (evt,tmpl) ->
    evt.preventDefault()

    post = {
      text: $(evt.target).find('input[name=postStatus]').val(),
      parent: null
    }

    $(evt.target).find('input[name=postStatus]').val('').focus()

    Meteor.call('addPost',post, (err,result) ->
      alert(error.reason) if err
    )
})
