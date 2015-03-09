@Postss = new Meteor.Collection 'postss'

Meteor.methods
  'addPost': (postAttributes) ->
    check(Meteor.userId(), String)
#    console.log(postAttributes)
#    check(postAttributes, {
#      text: String,
#      parent: Match.Any
#    })
    
    user = Meteor.user()
    post = _.extend postAttributes, {
      userId: user._id,
      author: user.username,
      date: new Date()
    }
    
    postId = Postss.insert post
    
    {_id: postId}
  
  'removePost': (id) ->
    check Meteor.userId(), String
    check id, String
    Postss.remove {_id:id,userId:Meteor.userId()}