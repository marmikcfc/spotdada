Template.searchResult.helpers
  searchResult: ->
    keyword = Session.get("query")

    query = new RegExp(keyword, "i")

    if keyword and keyword.length > 0
      result = Projects.find($or: 
        [
          {author: query}
          {title: query}
          {description: query}
          {tags: query}
          
        ]

      )
      result
    else 
      null

  hasImage: ->
    @src isnt 'N/A'


Template.search.events
  'keyup input#searchq': (e)->
    Session.set("query", e.currentTarget.value)
    return
