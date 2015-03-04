
Template.profile.rendered = function(){
    $('ul li.active').removeClass('active');
};



Template.profile.helpers({
 followers: function() {
 var user=Meteor.users.find({followers: username});
 console.log(user);

result= [];
/*//result.push({followername:user.username});
result.push({followername:"Raichu"});
result.push({followername:"Pichu"});
*/


user.forEach(function (user) {
result.push({followername:user.username})
});

/* result = { "followers":[]};
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

result=[];
user.forEach(function (user) {
result.push({followingname:user.username})
});


return result;

},

followingscount: function() {
 var user=Meteor.users.find({followings: username});

//console.log(typeof user);

//console.log(user.count());



return user.count();

},

});


