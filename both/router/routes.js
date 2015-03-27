/*Router.route('/dashboard');
*/

/*Router.configure({
  progressSpinner: false,
  layoutTemplate: 'main',
  loadingTemplate: 'loading',
});*/

//controller for  project list
var ProjectsListController = RouteController.extend({
  template: this.template,
  increment: 5,
  postsLimit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return {
      sort: this.sort,
      limit: this.postsLimit()
    };
  },
  subscriptions: function() {
    this.projectsSub = Meteor.subscribe("projects", this.findOptions());
  },
  projects: function() {
    return Projects.findFaster({}, this.findOptions());
  },
  data: function() {
    var hasMore;
    hasMore = this.projects().count() === this.postsLimit();
    return {
      projects: this.projects(),
      ready: this.projectsSub.ready,
      nextPath: (hasMore ? this.nextPath() : null)
    };
  }
});





var NewProjectsController = ProjectsListController.extend({
  template: "projectLists",
  sort: {
    submitted: -1,
    _id: -1
  },
  nextPath: function() {
    return Router.routes.newProjects.path({
      postsLimit: this.postsLimit() + this.increment
    });
  }
});




 BestProjectsController = ProjectsListController.extend({
  template: "projectLists",
  sort: {
    votes: -1,
    submitted: -1,
    _id: -1
  },
  nextPath: function() {
    return Router.routes.bestProjects.path({
      postsLimit: this.postsLimit() + this.increment
    });
  }
});


/*var FollowingProjectsController = RouteController.extend({
  template: 'followingProjects',
  increment: 5,
  postsLimit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return {
      sort: {
        submitted: -1,
        votes: -1,
        _id: -1
      },
      limit: this.postsLimit()
    };
  },
  subscriptions: function() {
    this.projectsSub = Meteor.subscribe("followingProjects", this.params.username, this.findOptions());
  },
  projects: function() {
    return Projects.find({});
  },
  nextPath: function() {
    return Router.routes.followingProjects.path({
      username: this.params.username,
      postsLimit: this.postsLimit() + this.increment
    });
  },
  data: function() {
    var hasMore;
    if (this.projects()) {
      hasMore = this.projects().count() === this.postsLimit();
    }
    return {
      projects: this.projects(),
      ready: this.projectsSub.ready,
      nextPath: (hasMore ? this.nextPath() : null)
    };
  }
});*/



 ProfileController = RouteController.extend({
  template: 'profile',
  increment: 5,
  postsLimit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return {
      sort: {
        submitted: -1,
        votes: -1,
        _id: -1
      },
      limit: this.postsLimit()
    };
  },
  subscriptions: function() {
    this.projectsSub = Meteor.subscribe("myProjects", this.params.username, this.findOptions());
    return [this.projectsSub, Meteor.subscribe('oneUser', this.params.username), Meteor.subscribe('followings', this.params.username), Meteor.subscribe('followers', this.params.username)];
  },
  user: function() {
    return Meteor.users.findFaster({
      username: this.params.username
    });
  },
  projects: function() {
    return Projects.findFaster({});
  },
   followings: function() {
  username=this.params.username;

//        console.log("   "+Meteor.users.findOne({followings:username}).fetch());

    return Meteor.users.findOne({followings:username});
  },
  followers: function() {
      username=this.params.username;

//console.log("   "+ Meteor.users.findOne({followings: this.params.username}).fetch());
    return Meteor.users.findOneFaster({followers:username});
  },
  nextPath: function() {
    return Router.routes.profile.path({
      username: this.params.username,
      postsLimit: this.postsLimit() + this.increment
    });
  },
  data: function() {
    var hasMore;
    hasMore = this.projects().count() === this.postsLimit();
    return {
      projects: this.projects(),
      user: this.user(),
      ready: this.projectsSub.ready,
      nextPath: (hasMore ? this.nextPath() : null),
      followers:this.followers(),
      followings:this.followings()
    };
  },

 waitOn: function () {
            "use strict";
            return [Meteor.subscribe('userProfile', this.params.username)];
        }

});

//Message Participants

var participantsFilter = function () {
    "use strict";
    if (Meteor.user()) {
        Meteor.subscribe('privateMessageParticipants', this.params.slug);
        var pm = PrivateMessages.findOneFaster({slug: this.params.slug});
        if (pm) {
            if (!_.contains(pm.participants, Meteor.userId())) {
                this.render('noAccessPrivateMessage');
            } else {
                this.next();
            }
        } else {
            this.render(this.notFoundTemplate);
        }
    } else {
        this.render('accessDenied');
    }
};


Router.map(function() {
 /*  this.route('/', {
  name: 'home'
});
*/

  this.route('/', {
  name: 'home',
  layoutTemplate: "homeLayout"
});
  
  

// User Logout

  Router.route('/sign-out', {
    name: 'signOut',
    onBeforeAction: function() {
      Meteor.logout(function() {
      });
      this.next();
    }
  });
  
  
  
this.route('/dashboard', {
  name: 'dashboard'
//  fastRender: true
});

this.route('/messages', {
  name: 'messages'
  //fastRender: true
});

this.route('/photos', {
  name: 'projects'
  //fastRender: true
});

this.route('/fundings', {
  name: 'fundings'
//  fastRender: true
});

this.route('/preProd', {
  name: 'preProd'
//  fastRender: true
});

this.route('/postProd', {
  name: 'postProd'
//  fastRender: true
});

this.route('/about', {
  name: 'about',
  layoutTemplate: "homeLayout"
});

this.route('/contact', {
  name: 'contact',
   layoutTemplate: "homeLayout"
});


this.route('preFund', {
        path: '/prefund/:prefundId',
        data: function(){
            var prefundId = this.params.prefundId;
         //   Meteor.subscribe('users-basic-info');
            Meteor.subscribe('all-preprod');
            var res = preFund.findOneFaster({_id: prefundId});
           
            return res;
        }
    });



this.route('postFund', {
        path: '/postfund/:postfundId',
        data: function(){
            var postfundId = this.params.postfundId;
           // Meteor.subscribe('users-basic-info');
            Meteor.subscribe('all-postprod');
            var res = postFund.findOneFaster({_id: postfundId});
           
            return res;
        }
//        fastRender: true
    });



this.route('/events', {
  name: 'events'
  //fastRender: true
});

this.route('/resources', {
  name: 'resources'
});

this.route('/search', {
  name: 'search',
  waitOn: function() {
    return Meteor.subscribe("projects", {
      sort: {
        submitted: -1,
        votes: -1,
        _id: -1
      },
      limit: 10
    });
  }
//  fastRender: true
});

this.route('/findfriends', {
  name: 'searchusers'
});

this.route('/account', {
  name: 'account'
});


this.route('newEvent', {
        path: '/events/new'
    });
    this.route('event', {
        path: '/events/:eventId',
        data: function(){
            var eventId = this.params.eventId;
        //    Meteor.subscribe('users-basic-info');
            var res = Events.findFaster({_id: eventId}).map(function(event, num){
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
        path: '/users/:username/:postsLimit?',
        controller: 'ProfileController',
        
    });
    this.route('notificationss', {
        path: '/notificationss',
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

    this.route("/new/:postsLimit?", {
  name: "newProjects"

});
this.route("/best/:postsLimit?", {
  name: "bestProjects",
});

this.route("/projectLists", {
  name: "projectLists",
});

this.route("/:username/followingProjects/:postsLimit?", {
  name: "followingProjects"
});
this.route('/projects/:_id', {
  name: 'projectPage',
  waitOn: function() {
    return [Meteor.subscribe('oneRecipe', this.params._id), Meteor.subscribe('comments', this.params._id)];
  },
  data: function() {
    return Projects.findOneFaster(this.params._id);
  }
});
this.route('/projects/:_id/edit', {
  name: 'projectEdit',
  waitOn: function() {
    return Meteor.subscribe('oneRecipe', this.params._id);
  },
  data: function() {
    return Projects.findOneFaster(this.params._id);
  }
});
this.route('/post-project', {
  name: 'postRecipe'
});


//followings

this.route('/users/:username/followings', {
  name: 'followings',
  waitOn: function() {
    return [Meteor.subscribe('oneUser', this.params.username), Meteor.subscribe('followings', this.params.username)];
  },
  data: function() {
    return Meteor.users.findFaster({
      followers: this.params.username
    });
  }
});

//followers

this.route('/users/:username/followers', {
  name: 'followers',
  waitOn: function() {
    return [Meteor.subscribe('oneUser', this.params.username), Meteor.subscribe('followers', this.params.username)];
  },
  data: function() {
    return Meteor.users.findFaster({
      followings: this.params.username
    });
  }
});

//MESSAGES MOFOS

this.route('privateMessagesList', {
        path: '/private-messages',
        waitOn: function () {
            "use strict";
            return [Meteor.subscribe('privateMessages', Meteor.userId()), Meteor.subscribe('allParticipantsAvatarsInvolved', Meteor.userId())];
        }
    });
    this.route('privateMessageCreate', {
        path: '/private-messages/create',
        waitOn: function () {
            "use strict";
            return [Meteor.subscribe('usernames')];
        }
    });
    this.route('privateMessage', {
        path: '/private-messages/:slug',
        onBeforeAction: participantsFilter,
        waitOn: function () {
            "use strict";
            return [Meteor.subscribe('privateMessage', this.params.slug), Meteor.subscribe('participantsAvatars', this.params.slug), Meteor.subscribe('invitationsPM', this.params.slug)];
        },
        data: function () {
            "use strict";
            return PrivateMessages.findOneFaster({slug: this.params.slug});
        }
    });
    this.route('privateMessageEdit', {
        path: '/private-messages/:slug/edit',
        data: function () {
            "use strict";
            return PrivateMessages.findOneFaster({slug: this.params.slug});
        }
    });


requireLogin = function() {
  if (!Meteor.user()) {
    if (Meteor.loggingIn()) {
      return this.render(this.loadingTemplate);
    } else {
      return this.render('home');
    }
  } else {
    return this.next();
  }
};
redirectHome = function() {
  if (Meteor.user()) {
    return this.render('dashboard');
  } else {
    return this.next();
  }
};
/*
this.onBeforeAction(requireLogin, {
  except: 'home'
});
this.onBeforeAction(redirectHome, {
  only: 'home'
});*/
});