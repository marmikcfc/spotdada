ImagesFS = new FS.Collection("images", {
    stores: [
        new FS.Store.FileSystem('images')

    ],
    filter: {
        maxSize: 1500000, //in bytes
        allow: {
            contentTypes: ['image/*'],
            extensions: ['png','jpg','jpeg','gif']
        },
        deny: {
            contentTypes: ['images/*'],
            extensions: ['pngs']
        },
        onInvalid: function (message) {
            if (Meteor.isClient) {
                alert(message);
            } else {
                console.log(message);
            }
        }
    }
});

Meteor.methods({
   set_avatar: function(_id,user_id){
       ImagesFS.update({$and:[{owner: user_id},{avatar: user_id}, {_id: {$ne: _id}}] },{$set:{avatar: false}});
       ImagesFS.update({_id: _id},{$set: {avatar: user_id}});
   }
});