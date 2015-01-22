Router.configure({
    layoutTemplate: "layout",
    notFoundTemplate: "notFound",
    loadingTemplate: "loading",
    yieldTemplates: {
        'header': { to: 'header' },
        'left_menu': { to: 'left_menu' }
    },

    before: function() {
        Session.set('audio_search',false);
        Session.set('wall_sort',false);
        Session.set('friend_audio',false);
        this.subscribe('myAudio');
        $('.friends_search_list').addClass('slow_hidden');
        if(!Meteor.userId() && this.route.name != 'register' && this.route.name != 'login') {
            Router.render('login');
        }
        else if( Meteor.user() && Meteor.user().profile.locked_screen && this.route.name != 'locked_screen' && this.route.name != 'register' && this.route.name != 'login' ){
            Router.go('locked_screen');
        }else{


            return [
                this.subscribe('friends'),
                this.subscribe('my_invites'),
                this.subscribe('invites'),
                this.subscribe('notifications')

            ];



        }
    },
    data: {
        my_friends: function(){
            friends = Friends.find({members: Meteor.userId() });
            my_friends =   _.flatten(_.pluck(friends.fetch(),'members'));
            return Meteor.users.find({$and:[{_id: { $in: my_friends } }, {_id: {$ne: Meteor.userId()}}] });
        },
        my_invites: function(){
            invites = Invites.find({sender: Meteor.userId() });
            my_invites = _.pluck(invites.fetch(),'receiver');
            return Meteor.users.find({_id: { $in: my_invites } });
        },
        invites: function(){
            invites = Invites.find({receiver: Meteor.userId() });
            my_invites = _.pluck(invites.fetch(),'sender');
            return Meteor.users.find({_id: { $in: my_invites } });
        }
    }
});






Router.map(function() {
    this.route("home", {
        path: '/',
        template: 'my_wall',
        waitOn: function(){
            return [Meteor.subscribe('wall',Meteor.userId()),Meteor.subscribe('myFiles')];
        }
    });
    this.route("locked_screen", {
        path: "/locked",
        yieldTemplates: {
        }

    });

 this.route('/register', function () {
    console.log("SCScscdbfbftfhvzsv;in");
    this.render('register');

});

    this.route("people", {
        path: "/people",
        waitOn: function(){
            return Meteor.subscribe('people');
        }
    });
    this.route("friends", {
        path: "/friends"

    });

    this.route("conversations", {
        path: "/conversations",
        waitOn: function(){
            return Meteor.subscribe('conversations');
        },
        data: {
            conversations: function(){
                return  Conversations.find();
            }
        }
    });
    this.route("conversation", {
        path: "/conversations/:_id",
        waitOn: function(){
            var _id = this.params._id;
            return [Meteor.subscribe('conversation',_id),Meteor.subscribe('chat', _id)];
        },
        data: {
            conv: function(){
                return Conversations.findOne(Router.current().params._id);
            },
             chat_messages: function(){
                return Chat.find();
            }
        }
    });

    this.route("my_audio", {
        path: "/my_audio",
        template: 'my_audio',
        yieldTemplates: {
            'header': { to: 'header' },
            'left_menu': { to: 'left_menu' },
            'friends_audio': {to: 'right_menu'}
        }
    });
    this.route("peopleAudio", {
        path: ":_id/audio",
        template: 'peopleAudio',
        waitOn: function(){
            return Meteor.subscribe('peopleAudio');
        },
        data: {
            audio: function(){
                return  AudioFS.find();
            }
        }
    });




    this.route("wall", {
        path: 'friend/:_id',
        template: 'wall',
        waitOn: function(){
            console.log(this.params._id);
            return [Meteor.subscribe('one_my_invite',this.params._id),Meteor.subscribe('one_invite',this.params._id),Meteor.subscribe('one_friend',this.params._id),Meteor.subscribe('wallFiles',this.params._id), Meteor.subscribe('wall',this.params._id),Meteor.subscribe('user',this.params._id)];
        }
    });




});

