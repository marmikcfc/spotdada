var redirectHome, requireLogin;

Router.configure({
  progressSpinner: false,
  layoutTemplate: 'main',
  loadingTemplate: 'loading'
});


Router.route('/', {
  name: 'splash'
});

Router.route('/circles', {
  name: 'myCircles'
});

Router.route('/home', {
  name: 'home'
});

Router.route('/messages', {
  name: 'messages'
});

Router.route('/photos', {
  name: 'projects'
});

Router.route('/events', {
  name: 'events'
});

Router.route('/browse', {
  name: 'search'
});

Router.route('/findfriends', {
  name: 'searchusers'
});

Router.route('/account', {
  name: 'account'
});


this.route('newEvent', {
        path: '/events/new'
    });
    this.route('event', {
        path: '/events/:eventId',
        data: function(){
            var eventId = this.params.eventId;
            Meteor.subscribe('users-basic-info');
            var res = Events.find({_id: eventId}).map(function(event, num){
                event.timeLeft = moment(new Date(event.startTime)).from(new Date());
                event.readableStartTime = moment(event.startTime).format('MMMM Do YYYY, h:mm a');
                event.readableEndTime = moment(event.endTime).format('MMMM Do YYYY, h:mm a');
                event.attendeesLength = event.attendees.length;
                return event;
            });
            return res[0];
        }
    });
    this.route('profile', {
        path: '/users/:userId',
        data: function(){
            var userId = this.params.userId;
            Meteor.subscribe('users-basic-info');
            var res = Meteor.users.find({_id: userId}).map(function(user, num){
                user.email = user.emails[0].address;
                return user;
            });
            return res[0];
        },
        onBeforeAction: function(){
            if (!Meteor.userId()){
                Session.set('login-required-msg', 'Please log in before viewing any user profiles.');
                Router.go('/login');
            }
            else {
                // user logged in, do nothing
            }
            this.next();
        }
    });
    this.route('notifications', {
        path: '/notifications',
        onBeforeAction: function(){
            if (!Meteor.userId()){
                Session.set('login-required-msg', 'Please log in before viewing your notifications.');
                Router.go('/login');
            }
            else {
                // user logged in, do nothing
            }
            this.next();
        }
    });


Router.route('/profile/:_id', {
  name: 'profile',
  data: function() {
    return Users.findOne(this.params._id);
  }
});

requireLogin = function() {
  if (!Meteor.user()) {
    if (Meteor.loggingIn()) {
      return this.render(this.loadingTemplate);
    } else {
      return this.render('splash');
    }
  } else {
    return this.next();
  }
};
redirectHome = function() {
  if (Meteor.user()) {
    return this.render('home');
  } else {
    return this.next();
  }
};

Router.onBeforeAction(requireLogin, {
  except: 'splash'
});

Router.onBeforeAction(redirectHome, {
  only: 'splash'
});