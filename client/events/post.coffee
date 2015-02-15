Template.post.events({
  'submit form.postComment': (evt,tmpl) ->
    evt.preventDefault()
    
    post = {
      text: $(evt.target).find('input[name=postComment]').val(),
      parent: this._id
    }
  
    $(evt.target).find('input[name=postComment]').val('').focus()
    
    Meteor.call('addPost',post, (err,result) ->
      alert(err.reason) if err
    )
  
  'click a.likeBtn': (evt,tmpl) ->
    evt.preventDefault()
    
    like = {
      post: this._id
    }
    
    Meteor.call('addLike',like, (err,result) ->
      alert(err.reason) if err
    )
  
  'click a.unlikeBtn': (evt,tmpl) ->
    evt.preventDefault()
    
    ###like = {
      post: this._id
    }###
#    console.log this._id
    
    # this._id is id of the current post
    Meteor.call('removeLike',this._id, (err,result) ->
      alert(err.reason) if err
    )
})