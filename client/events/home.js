/*Template.dashboard.events({
  
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
*/
/*Template.dashboard.events({
  
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
*/


Template.dashboard.events({
  'click .customImageUploadBtn': function(e) {
    e.preventDefault();
    return document.getElementById("imageInput").click();
  },
  'submit form.postStatus': function(evt, tmpl) {
    var post, projectImage, reader;
    evt.preventDefault();
    evt.preventDefault();
    projectImage = $(evt.target).find('[name=imageInput]')[0].files[0];
    reader = new FileReader();
    reader.onload = function(e) {
      var post;
      post = {
        text: $(evt.target).find('input[name=postStatus]').val(),
        parent: null,
        img: e.target.result
      };
      $(evt.target).find('input[name=postStatus]').val('').focus();
      return Meteor.call('addPost', post, function(err, result) {
        if (err) {
          return alert(error.reason);
        }

        if(result){
/*
          $('#stat').children('input').val('');

          $('#stat').children('#imageInput').val('');*/

 $('#stat')[0].reset();


        }
      });
    };
    if (projectImage) {
      reader.readAsDataURL(projectImage);
    } else {
      post = {
        text: $(evt.target).find('input[name=postStatus]').val(),
        parent: null,
        img: ''
      };
      return Meteor.call('addPost', post, function(err, result) {
        if (err) {
          return alert(error.reason);
        }


        if(result){

          $('#stat').children('input').val('');

         // $('#stat').children('button').val('');
        }

      });
    }
  }
});