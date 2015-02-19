Meteor.methods({
    'avatar-upload': function (userId, fileInfo, fileData) {
        Meteor.users.update({_id: userId}, {
            $set: {
                "profile.avatar": fileData
            }
        });
    }
});

Meteor.methods({
	addVideo:function(fpfile){
		this.unblock();
		if(this.userId){
			var video={
				author:this.userId,
				authorName:getDisplayNameById(this.userId),
				created:new Date(),
				updated:new Date(),
				up:0,
				down:0,
				views:0,
				downloads:0,
				url:fpfile.url,
				filename:fpfile.filename,
				mimetype:fpfile.mimetype,
				key:fpfile.key,
				size:fpfile.size,
				isWriteable:fpfile.isWriteable
			};
			Video.insert(video,function(e,id){
				video._id=id;
				return video;
			});
		}
	},
	getIndexData:function(){
		return Video.find({}).fetch();
	},
	getVideo:function(id){
		return Video.findOne(id);
	}
});
