Template.locked_screen.events({
   'submit #locked_form':function(e,template){
       console.log('awd');
       e.preventDefault();
       password = template.$('#locked_password').val();

       email = Meteor.user().emails[0].address;
       Meteor.loginWithPassword(email,password,function(e,s){
           if(e){
               Meteor.call('notify', e.reason, 'Error')
           }else{
               Meteor.call('locked_screed_disable');
           }
       })
   },
    'keypress #locked_password' : function(e,template){
        if(e.keyCode == 13){
            template.$('#locked_form').submit();
        }

    }
});