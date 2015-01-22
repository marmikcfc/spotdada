Template.modal_image.rendered = function(){
    this.$('.wall_modal_image').modal('show')
};

Template.modal_image.events({
    'hidden.bs.modal .wall_modal_image': function(e,t){
        t.find('.wall_modal_image').remove();
    },
    'click .open_one_wall_image': function(){
        modal = UI.renderWithData(Template.modal_image, {image: this});
        UI.insert(modal, document.body);
    }
});
Template.modal_image.helpers({
    images: function(){
        return ImagesFS.find({},{sort:{uploadedAt: -1}});
    }
});

