Meteor.subscribe('users-basic-info')

Template.post.helpers({
  'likeCount': () -> Likes.find({post:this._id}).count(),
  'postComments': () -> Postss.find({parent:this._id}),
  'ownLike': () -> Likes.find({post:this._id,userId:Meteor.userId()}).count()
})