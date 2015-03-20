//Meteor.subscribe('users-basic-info');

Template.post.helpers({
  'getUserAvatar': function(userId) {
 /*   console.log("INTO USER AVATAR"); */
    if(Meteor.users.findOne(userId).profile.avatar)
    {
      
      return Meteor.users.findOne(userId).profile.avatar;
  }
    
  else{
    
    return "";
  }  
  }
});


Template.postComment.helpers({
  'getUserAvatar': function(userId) {
//    console.log("INTO USER AVATAR");
    if(Meteor.users.findOne(userId).profile.avatar)
    {
      
      return Meteor.users.findOne(userId).profile.avatar;
  }
    
  else{
    
    return "";
  }  
  }
});



