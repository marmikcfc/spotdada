Router.configure({

  layoutTemplate: 'appLayout',
  controller: 'AppController',
  loadingTemplate: 'loading',
  waitOn: function() {

       "use strict";
        if (Meteor.user() !== undefined) {
            //user is ready
            if (Meteor.user() && Meteor.user().msgnotifications) {
                //user is logged in
                return [
                Meteor.subscribe('msgnotifications',
                Meteor.user().msgnotifications), 
                Meteor.subscribe('privateMessages', Meteor.userId()), 
                Meteor.subscribe('allParticipantsAvatarsInvolved', Meteor.userId()),
                Meteor.subscribe('notifications'),
                Meteor.subscribe('usernames')
                ];
            }
        }
//    return [Meteor.subscribe('notifications')];
  }
});

// Router.plugin('loading', {loadingTemplate: 'loading'});
Router.plugin('dataNotFound', {dataNotFoundTemplate: 'notFound'});

prepareView = function() {
  var $bd;
  window.scrollTo(0, 0);
  $('body').removeClass('sidebar-active');
  $('.modal-backdrop').removeClass('in');
  $bd = $('.modal-backdrop');
  setTimeout(function() {
    return $bd.remove();
  }, 300);
  return $('body').attr('style', '');
};
Router.onAfterAction(prepareView);
