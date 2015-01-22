Template.wall.rendered = function(){

};
Template.wall.helpers({
    currentProfile: function(){
        return Meteor.users.findOne({_id: Router.current().params._id});
    },
    on_mind: function(on_mind){
        if(on_mind && on_mind.length){
            return true;
        }
        return false;
    },
    online: function(){
        if(currentProfile().status && currentProfile().status.online){
           return 'Online';
        }
        return 'Offline';
    },
    wall: function(){
        if(Session.get('wall_sort')){
            return Walls.find({sender: Session.get('wall_sort')},{sort: {created_at: -1}});
        }else{
            return Walls.find({},{sort: {created_at: -1}});
        }
    },
    avatar: function(){
        user_id = Router.current().params._id;
        return ImagesFS.findOne({$and:[{owner: user_id},{avatar: user_id } ]});
    },
    wallImages:function(){
        return ImagesFS.find({owner: Router.current().params._id },{limit:3, sort:{uploadedAt: -1}});
    },
    is_friend:function(){
       if(Friends.findOne()){
           return true;
       }
        return false;
    },
    my_invite: function(){
        if(Invites.findOne({$and:[{sender: Meteor.userId()},{receiver: currentProfile()._id}]})){
            return true;
        }
        return false;
    },
    invite:function(){
        if(Invites.findOne({$and:[{receiver: Meteor.userId()},{sender: currentProfile()._id}]})){
            return true;
        }
        return false;
    }
});
Template.wall.events({
    'click .wall_image': function(){
        modal = UI.renderWithData(Template.modal_image, {image: this});
        UI.insert(modal, document.body);
    },
    'click .show_all_wall_images': function(){
        modal = UI.renderWithData(Template.modal_image, {many: true});
        UI.insert(modal, document.body);
    },
    'click .avatar':function(){
        user = currentProfile();
        avatar = ImagesFS.findOne({avatar: user._id });
        if(avatar){
            modal = UI.renderWithData(Template.modal_image, {image: avatar});
            UI.insert(modal, document.body);
        }else{
            Meteor.call('notify',user.profile.name+' does not have avatar yet.', 'Info' )
        }

    },

//    WALL ACTIONS
    'click .wall_records_header a': function(e){
      e.preventDefault();
      user = currentProfile();
      if(Session.get('wall_sort')){
          $(e.currentTarget).text('Show only '+user.profile.name+' records');
          Session.set('wall_sort',false);
      }else{
          $(e.currentTarget).text('Show All records');
          Session.set('wall_sort',user._id);
      }
    },
    'focusin .wall_textarea': function(){
       $('.fa-chevron-down').click();
    },
    'click .fa-chevron-up': function(e){
        $('.wall_textarea').css('height','33px');
        $(e.currentTarget).attr('class','fa fa-chevron-down pull-right fa-2x');
        $('.new_wall,.append_to_wall').addClass('slow_hidden');
        $('.wall_append_box').addClass('slow_hidden');
    },
    'click .fa-chevron-down': function(e){
        $('.wall_textarea').css('height','70px');
        $(e.currentTarget).attr('class','fa fa-chevron-up pull-right fa-2x');
        $('.new_wall, .append_to_wall').toggleClass('slow_hidden');
    },
    'click .append_to_wall': function(){
        $('.wall_append_box').toggleClass('slow_hidden');
    },
    'click .new_wall': function(){
        message = $('.wall_textarea');
        sender_id = currentProfile()._id;
        Meteor.call('new_wall', message.val(),sender_id);
        message.val('');
    },
    'click .remove_wall': function(){
        Meteor.call('remove_wall', this._id);
    },
    'click .change_status':function(){
        $('.change_status_box').toggleClass('slow_hidden');
    },
    'click .change_status_box_save':function(){
        status = $('.change_status_box_input').val();
        if(status.length > 1){
            $('.change_status').text(status);
        }else{
            $('.change_status').text('Change Status');
        }
        $('.change_status_box').toggleClass('slow_hidden');

    },


//    FRIENDS ACTIONS
    'click .remove_from_friends': function(){
        console.log(currentProfile()._id);
        Meteor.call('delete_friend',currentProfile()._id);
    },
    'click .add_friend': function(){
        Meteor.call('invite_new',currentProfile()._id);
    },
    'click .cancel_friend_request':function(){
        Meteor.call('cancel_invite', currentProfile()._id);
    },
    'click .decline_friendship':function(){
        Meteor.call('decline_friendship', currentProfile()._id);
    },
    'click .accept_friendship':function(){
        Meteor.call('invite_new', currentProfile()._id);
    }












});
currentProfile = function(){
    return Template.wall.currentProfile();
};