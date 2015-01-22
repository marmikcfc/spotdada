@Template.login.events
  'submit #login-form' : (e, t) ->
    e.preventDefault();
    email = t.find('#login-email').value
    password = t.find('#login-password').value
    Meteor.loginWithPassword email, password, (err) ->
      if (err)
        console.log(err);
      else
        Router.go('/')
    false
  'click .sign_in_fill': ->
    $('#login-form').find('#login-email').val('b@mail.ru')
    $('#login-form').find('#login-password').val('12345678')

  'click #reg': ->
    console.log("sfsvsf")
    Router.go('register')



