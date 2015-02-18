Meteor.subscribe('all-preprod');
Meteor.subscribe('all-postprod');
Meteor.subscribe('users-basic-info');


Template.fundings.helpers({
   'displayprefund': function(){
            return preFund.find()
                },
   'displaypostfund': function(){
            return postFund.find()
                }
   
});     