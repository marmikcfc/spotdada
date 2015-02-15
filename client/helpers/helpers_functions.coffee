UI.registerHelper 'formatTime', (context, options) ->
  if(context)
    moment(context).format('DD/MM/YYYY, hh:mm')