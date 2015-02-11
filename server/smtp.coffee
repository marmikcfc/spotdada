Meteor.startup ->
  Accounts.emailTemplates.from = "spotDada <admin@spotDada.com>";

  Accounts.emailTemplates.resetPassword.text = (user, url) ->
    url = url.replace("#/", "")
    "Simply click the link below:\n\n" + url
  return
  
Meteor.startup ->
  process.env.MAIL_URL = "smtp://postmaster%40yuichidev.mailgun.org:8-jyoubwj811@smtp.mailgun.org:587"
  return
