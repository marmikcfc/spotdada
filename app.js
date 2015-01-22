if(Meteor.isClient){
    Meteor.methods({
        notify: function (message,status) {
            $.gritter.add({
                title: status,
                text: message,
                time: 3000
            });
        }
    });


    Player = {
        index: 0,
        user_id: Meteor.userId(),
        playList: function(){
            return AudioFS.find({owner: this.user_id},{sort:{uploadedAt: 1}}).fetch();
        },
        set_index: function(_id){
            var that = this;
            this.playList().forEach(function(v,i){
                if(v._id == _id){
                    that.current_index().set(i);
                }
            });
        },
        used_ids: [],
        first: function(){
            return this.playList()[this.playList.length-1];
        },

        current_index: function(){
            var that = this;
            return {
                next: function(){
                    if(that.index == 0){
                        this.set(that.playList().length-1);
                        that.used_ids = [];
                    }else{
                        that.index--;
                    }
                },
                prev: function(){
                    if(that.index == that.playList().length-1){
                        this.set(0);
                    }else{
                        that.index++;
                    }
                },
                set: function(ind){
                   that.index = ind;
                   this.get();
                },
                get: function(){
                    if(that.used_ids.length == 0){
                        that.index = that.playList().length-1;
                    }
                    return that.index;
                }
            }
        },
        next: function(){
            this.current_index().next();
            var song = this.playList()[this.current_index().get()];
            this.used_ids.push(song._id);
            var target = $('.select_song[name="'+song.url()+'&store=audio"]');
            this.select_song(song.url(),song.name(),target);
        },
        prev: function(){
            this.current_index().prev();
            var song = this.playList()[this.current_index().get()];
            this.used_ids.push(song._id);
            var target = $('.select_song#'+song._id);
            this.select_song(song.url(),song.name(),target);

        },
        player: function(){
            return document.getElementById('audio-player');
        },
        mark_selected: function(target){
            $('.select_song.currentMusic').removeClass('currentMusic');
            target.addClass('currentMusic');
        },
        songName: '',
        set_songName: function(name){
            this.songName = name;
            $('.songName').text(name);
        },
        set_songUrl: function(url){
            this.player().src = url;
        },
        play_btn: function(){
            if(!this.player().src){
                this.next();
            }else{
                this.play();
            }
        },
        play: function(){
            $('.play-bt').attr('class','pause-bt').find('i').attr('class','fa fa-pause fa-fw');
            this.player().play();
        },

        stop: function(){
            this.pause();
            this.player().currentTime = 0;
        },

        pause: function(){
            $('.pause-bt').attr('class','play-bt').find('i').attr('class','fa fa-play fa-fw');
            this.player().pause();
        },
        progress: function(){
            var player = this;
            var elapsedTime = Math.round(player.currentTime);
            var progress  = $('.play_progress div');
            var playTime = $('.current_playTime');
            var min = 0;
            var sec = 0;
            if(progress){
                if(player.currentTime == player.duration){
                    Player.next();
                    progress.width(0);
                }
                var fWidth = (elapsedTime / this.duration ) * (progress.parents('.play_progress').width());
                if (fWidth > 0) {
                    progress.width(fWidth);
                    if(elapsedTime>60 && elapsedTime<120){
                        min = 1;
                        sec = parseInt(elapsedTime) - 60;
                    }else if(elapsedTime>120 && elapsedTime<180){
                        min = 2;
                        sec = parseInt(elapsedTime) - 120;
                    }else{
                        sec = elapsedTime;
                    }
                    playTime.text(min+ ':' +sec);
                }
            }

        },
        chanels: [
            {name:'MFM Online',url: 'http://radio.mfm.ua:8080/online128'},
            {name:'Sky.FM:: Smooth Jazz',url:'http://pub3.sky.fm/sky_smoothjazz'},
            {name:'Zaycev.FM:: RNB',url:'http://www.zaycev.fm:9001/rnb/ZaycevFM(128)'},
            {name:'Те кто с нами',url:'http://cs1-49v4.vk.me/p1/06341390c1a454.mp3'}
        ],
        radio: function(chanel){
            this.select_song(chanel.url,chanel.name,false);
        },
        loadeddata: function(){
            $('.show_player').html('Show Player <i class="fa fa-play fa-fw"></i>');
            $('.songName').text(this.songName);
        },
        loadstart: function(){
            $('.show_player, .songName').text('loading...');
        },
        select_song: function(url,name,target){
            this.set_songName(name.split('.mp3')[0]);
            this.set_songUrl(url);
            this.play();
            if(target)
                this.mark_selected(target);
        },
        scroll: function(target,pageX){
            if(this.player().src){
                var parentOffset = $('.play_progress').offset();
                var relX = pageX - parentOffset.left;
                var new_width = (this.player().duration * (relX-5) ) / (target.width());
                this.player().currentTime = new_width;
            }
        }

    };

    UI._allowJavascriptUrls();

}




Before = {
    load: function(){
    var handle, self;
    self = this;


    if (!this._site) {
        this._site = {
            ready: false,
            readyDeps: new Deps.Dependency
        };
        var site;
        site = self._site;
        site.ready = true;
        return site.readyDeps.changed();
    }
    handle = {
        ready: function() {
            var site;
            site = self._site;
            site.readyDeps.depend();
            return site.ready;
        }
    };
    return handle;
},
    set: function(field,arg){
    var site;
    site = self._site;
    site[field] = arg;
    return site.readyDeps.changed();
    },
    get: function(arg){
    var site;
    site = self._site;
    return site[arg];
}
};


