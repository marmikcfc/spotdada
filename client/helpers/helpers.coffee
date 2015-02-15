UI.registerHelper "pluralize", (num, thing) ->
  if num is 1
    "1 " + thing
  else
    num + " " + thing + "s"