@Template.register.events
    'submit #register-form' : (e, t) ->
      e.preventDefault();
      email = secureInput(t.find('#account-email').value)
      password = t.find('#account-password').value
      confirmation = t.find('#confirmation_account-password').value
      phone = t.find('#account-phone').value
      name = t.find('#account-name').value
      if confirmation is password and name isnt ''
        Accounts.createUser email : email, password : password, profile: { name : name , locked_screen: false,  phone: false, on_mind: false, personal_status: false} , (err)->
          if err
            Meteor.call('notify',err.reason, 'Error')
          else
            Router.go('/')
      else
        Meteor.call('notify',"Password fields not Match! Or Empty Name!", 'Error')
      false

secureInput = (val) ->
  $.trim(val)
  val.replace(/^\s*|\s*$/g, "")
  val.replace /<\/?[^>]+>/g, ""
isValidPassword = (val) ->
  val.length >= 6 ? true : false



