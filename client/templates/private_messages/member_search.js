Template.memberSearch.rendered = function () {
    "use strict";
    var instance = EasySearch.getComponentInstance(
        {id: 'userSearch', index: 'users'}
    );
    instance.on('total', function (num) {
        if (num == 0) {
            Session.set('totalResultSetEmpty', true);
        } else {
            Session.set('totalResultSetEmpty', false);
        }
    });
};