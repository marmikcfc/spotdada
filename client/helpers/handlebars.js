
Handlebars.registerHelper('log', function(arg) {
   console.log(arg);
});
Handlebars.registerHelper('my_name', function() {
    if(Meteor.user()){
        return  Meteor.user().profile.name;
    }else{
        return 'Guest'
    }
});
Handlebars.registerHelper('user_name', function(profile) {
    return  profile.name;
});
Handlebars.registerHelper("prettifyDate", function(timestamp){
    return moment(new Date(timestamp)).fromNow();
});


Handlebars.registerHelper('emails_address', function(emails) {
    return  emails[0].address;
});
Handlebars.registerHelper('avatar_url', function(user_id) {
    if(ImagesFS.findOne({owner:user_id})){
        return ImagesFS.findOne({owner:user_id}).url({storage: 'images'});
    }

     return '/img/deactivated_100.gif';
});
Handlebars.registerHelper('last_message_exist', function(last) {
    if(last){
        return  true;
    }else{
        return false;
    }
});







