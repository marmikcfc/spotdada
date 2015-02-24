
UI.registerHelper('currentUserUsername', function () {
    "use strict";
    return Meteor.user().username;
});

UI.registerHelper('defaultAvatar', function () {
    "use strict";
    return DEFAULTAVATAR;
});

UI.registerHelper('noAvatar', function (type) {
    "use strict";
    var user;
    if (type === "assignee") {
        user = Users.findOne({_id: this.assigneeId});
        if (user) {
            return user.profile.image.length === 0;
        }
    } else if (type === "currentUser") {
        return Meteor.user().profile.image.length === 0;
    } else if (type === "profile") {
        return this.profile.image.length === 0;
    } else if (type === "productOwnerOrAdministrator") {
        user = Users.findOne({username: this.author});
        if (user) {
            return user.profile.image.length === 0;
        }
    }
});

UI.registerHelper('navTabIsActive', function (navTab) {
    "use strict";
    return Session.equals('activeNavTab', navTab);
});


UI.registerHelper('avatar', function () {
    "use strict";
    if (this.profile.image != "") {
        return this.profile.image;
    }
    return DEFAULTAVATAR;
});
addToRecipientsList = function () {
    "use strict";
    $(checkboxSelector).each(function () {
        if (this.checked) {
            if (Recipients.find({username: $(this).val()}).count() === 0) {
                Recipients.insert({username: $(this).val()});
                highlightCounterOnPanel("Recipients");
            } else {
                throwAlert('error', 'Sorry!', "You can't add the same person twice.");
            }
        }
    });
};

removeRecipient = function (e) {
    "use strict";
    e.preventDefault();
    Recipients.remove({_id: $(e.target).attr('name')});
    highlightCounterOnPanel("Recipients");
};



isValidPassword = function (password) {
    "use strict";
    if (password.length < 6) {
        highlightWarningForRegisterPasswordFields();
        throwAlert('warning', 'Error', 'Your password should be 6 characters or longer.');
        return false;
    }
    return true;
};

areValidPasswords = function (password, confirm) {
    "use strict";
    if (!isValidPassword(password)) {
        return false;
    }
    if (password !== confirm) {
        highlightWarningForRegisterPasswordFields();
        throwAlert('warning', 'Error', 'Your two passwords are not equivalent.');
        return false;
    }
    return true;
};


setSessionForActiveNavTab = function(name) {
    "use strict";
    Session.set('activeNavTab', name);
};

function highlightWarningForRegisterPasswordFields() {
    "use strict";
    highlightWarningForField('#register-password');
    highlightWarningForField('#register-password-confirm');
}



isNotEmpty = function (selector, value) {
    "use strict";
    if (value && value !== '') {
        return true;
    } else {
        highlightWarningForField(selector);
        return false;
    }
};


resetAlertsForFields = function () {
    "use strict";
    $('.form-control').each(function () {
        $(this).parent().removeClass('has-warning').removeClass('has-error');
        $(this).parent().find('span').remove();
    });
};

var checkboxSelector = '.checkbox-multiple-select';