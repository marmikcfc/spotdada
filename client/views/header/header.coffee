Template.header.helpers
  signedInUser: ->
    if Meteor.user()
      Meteor.user().username
    else
      null

  activeRouteClass: ->
    args = Array::slice.call(arguments, 0)
    args.pop()
    active = _.any(args, (name) ->
      Router.current() and Router.current().route.getName() is name
    )
    active and "active-tab"


Template.header.events
  'click #menuLink': (e)->
    toggleClass= (element, className) ->
      classes = element.className.split(/\s+/)
      length = classes.length
      i = 0
      while i < length
        if classes[i] is className
          classes.splice i, 1
          break
        i++
      
      classes.push className  if length is classes.length
      element.className = classes.join(" ")
      return

    layout = document.getElementById("layout")
    menu = document.getElementById("menu")
    menuLink = document.getElementById("menuLink")
    main = document.getElementById("main")

    active = 'active'

    e.preventDefault()

    toggleClass layout, active
    toggleClass menu, active
    toggleClass menuLink, active
    toggleClass main, active