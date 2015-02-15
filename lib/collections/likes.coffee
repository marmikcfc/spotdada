@Likes = new Meteor.Collection 'likes'

Meteor.methods
  'addLike': (LikeAttributes) ->
    check(Meteor.userId(), String)
#    console.log(LikeAttributes)
    check(LikeAttributes, {
      post: String
    })
    
    user = Meteor.user()
    Like = _.extend LikeAttributes, {
      userId: user._id
#      author: user.username,
#      date: new Date()
    }
    
    LikeId = Likes.insert LikeAttributes
    
    {_id: LikeId}
  
  'removeLike': (postId) ->
#    console.log(id)
#    console.log(Meteor.userId())
    check Meteor.userId(), String
    check postId, String
    Likes.remove {post:postId,userId: Meteor.userId()}