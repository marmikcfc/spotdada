Template.memberMultipleSelect.events({
    'click .select-multiple-user-element': function (e) {
        "use strict";
        operateMultipleSelect($('#select-multiple-product option[value=' + e.currentTarget.value + ']'));
    }
});

Template.memberMultipleSelect.helpers({
    totalResultSetEmpty: function () {
        "use strict";
        return Session.equals('totalResultSetEmpty', true);
    }
});

Template.memberMultipleSelect.rendered = function () {
    "use strict";
    Session.set('totalResultSetEmpty', true);
};