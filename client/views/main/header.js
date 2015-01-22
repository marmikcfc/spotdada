Template.header.events({
    'click .sign_out': function(){
        Meteor.logout(Router.go('login'));
    },
    'click .friends_search': function(){
        $('.friends_search_list').removeClass('slow_hidden');
    },
    'click .lock_screen':function(){
        Meteor.call('locked_screen_enable');
    },
    'click .show_player': function(){
        $('.header_player_box').toggleClass('flip').css('margin-top','-2px');
        $('.show_player_box').toggleClass('flip').css('margin-top','-25px');

    },
    'click .hide_player': function(){

        $('.header_player_box').toggleClass('flip').css('margin-top','20px');
        $('.show_player_box').toggleClass('flip').css('margin-top','0px');
    },
    'click .play-bt':function(){
        Player.play_btn();
    },
    'click .pause-bt':function(){
        Player.pause();
    },
    'click .stop-bt':function(){
        Player.stop();
    },
    'click .next-bt': function(){
        Player.next();
    },
    'click .prev-bt': function(){
        Player.prev();
    },
    'mouseenter .volumeSlider':function(){
        $('.volume_box').css('opacity',1);
    },
    'mouseleave .volumeSlider':function(){
        $('.volume_box').css('opacity',0);
    },
    'click .play_progress':function(e){
        Player.scroll($(e.currentTarget), e.pageX);
    }

});



Template.header.rendered = function(){
    Player.player().addEventListener("loadeddata", function(){
       Player.loadeddata();
    });
    Player.player().addEventListener("loadstart", function(){
        Player.loadstart();
    });
    Player.player().addEventListener("progress", function(e,v)
        {
          console.log('progress', e.timeStamp);
        }
    );

    Meteor.defer(function() {
        Player.user_id = Meteor.userId();
        Player.player().addEventListener("timeupdate", Player.progress, true);
    });

    $( ".volumeSlider" ).slider({
        range: "max",
        min: 0,
        max: 10,
        value: 10,
        slide: function( event, ui ) {
            Player.player().volume = ui.value/10;
            $(".currentVolume").text( ui.value );
        }
    });

};





