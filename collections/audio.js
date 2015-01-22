AudioFS = new FS.Collection("audio", {
    stores: [
        new FS.Store.FileSystem('audio')

    ],
    filter: {
        maxSize: 5500000, //in bytes
        allow: {
            contentTypes: ['audio/mp3','audio/*'],
            extensions: ['mp3']
        },
        deny: {
            contentTypes: ['video/*','images/*'],
            extensions: ['mp4']
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

