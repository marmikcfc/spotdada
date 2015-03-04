
Template.profile.rendered = function(){
    $('ul li.active').removeClass('active');
};



Template.profile.helpers({
 followers: function() {
 var user=Meteor.users.find({followers: username});

/* result = { "followers":[]};
user.forEach(function (user) {
result.followers.push({username:user.username})
});

console.log("result");

console.log(result.followers[1].username);

*/


/*result= {

followings: {	abc:"pqr",
	            mar:"xyz",
	            username:"marmikcfc"
            }

};

abc= {

	abc:"pqr",
	mar:"xyz",
	username:"marmikcfc"
};




result.push(followings: abc);

console.log(result);
*/



result= [];
result.push("Pikachu");
result.push("Raichu");
result.push("Pichu");

console.log(result[0]);

return result;

},
followerscount: function() {
 var user=Meteor.users.find({followers: username});

//console.log(typeof user);

//console.log(user.count());



return user.count();

},
followings: function() {
var user=Meteor.users.find({followings: username}).fetch();
//console.log(user);

return user;

}

});


