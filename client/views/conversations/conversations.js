

Template.conversation.events({
    'click .send_message':function(){
        chat_body = $('.chat_body');
        Meteor.call('new_chat',chat_body.val(),Template.conversation.conv()._id,currentProfile()._id);
        scrollToBottom();
        $("div#conversation_box .row .col-lg-7 p").emotions();
    },
    'click #smilesBtn': function(){
        $("#smilesChoose").toggle();
    },
    'click #smilesChoose span':function(e){
        var inputEl = $(".chat_body");
        var shortCode = $.emotions.shortcode($(e.currentTarget).attr("title"));
        inputEl.val(inputEl.val() + " " + shortCode + " ").focus();
        $("#smilesChoose").toggle();
    }
});
Template.conversations.events({
    'click':function(){
        Meteor.call('read_chat',this._id,function(e,v){
            console.log(e,v);
        });
        members = this.members;
        var right_id;
        $.each(members, function(i,v){
            if(v != Meteor.userId()){
                right_id = v;
            }
        });
        Router.go('conversation',{_id: right_id});
    }
});

Template.chat.rendered = function(){
   this.$('.row .col-lg-7 p').emotions();
};
Template.conversations.rendered = function(){
    Meteor.setTimeout(function() {
        this.$('.row .col-lg-7 p').emotions();
    },100);
};

Template.conversation.rendered = function(){
    Meteor.setTimeout(function() {
        $('#conversation_box').slimScroll({height: '700px',start: 'bottom'});

    },100);
    Notifications.find().observeChanges({
        added: function(id, notif) {
            if(notif.receiver == Meteor.userId() ){
                if(Router.current().route.name == "conversation" && Router.current().params._id == notif.sender ){
                    Notifications.remove(id);
                }
            }
        }
    });
    var smiles = $("#smilesChoose");
    smiles.emotions();

};
Template.conversation.destroyed = function(){
    $('.slimScrollDiv').remove()
};

function scrollToBottom(){
    scrollTo_val = $('#conversation_box>div.row:first').height() * $('#conversation_box > div.row').length + 'px'
    $('#conversation_box').slimScroll({scrollTo: scrollTo_val})
}

Template.conversation.conv =  function(){
    return Conversations.findOne();
};

currentProfile = function(){
 return Meteor.users.findOne(Router.current().params._id);
};