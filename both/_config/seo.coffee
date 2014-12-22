Meteor.startup ->
  if Meteor.isClient
    SEO.config
      title: @Config.name
      meta:
        description:  @Config.subtitle
