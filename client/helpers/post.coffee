
Template.post.helpers({
  'likeCount': () -> Likes.findFaster({post:this._id}).count(),
  'postComments': () -> Postss.findFaster({parent:this._id}),
  'ownLike': () -> Likes.findFaster({post:this._id,userId:Meteor.userId()}).count()
})