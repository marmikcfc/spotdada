AccountsTemplates.configureRoute('signIn', {layoutTemplate: 'appLayout',
                                           redirect: '/dashboard'});
AccountsTemplates.configureRoute('signUp', {layoutTemplate: 'appLayout',redirect: '/account'});
AccountsTemplates.configureRoute('ensureSignedIn', {layoutTemplate: 'appLayout'});
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('verifyEmail');

//Fields

AccountsTemplates.removeField('email');
AccountsTemplates.addField({
    _id: 'email',
    type: 'email',
    required: true,
    re: /.+@(.+){2,}\.(.+){2,}/,
    errStr: 'error.accounts.Invalid email',
    trim: true,
    lowercase: true
});


AccountsTemplates.addField({
    _id: 'username',
    type: 'text',
    displayName: 'username',
    required: true,
    minLength: 3,
    errStr: 'error.minChar'
});



AccountsTemplates.removeField('password');
AccountsTemplates.addField({
    _id: 'password',
    type: 'password',
    required: true,
    minLength: 8,
    errStr: 'error.minChar'
});

/*
 AccountsTemplates.addField({
 _id: 'username_and_email',
 type: 'text',
 displayName: 'Name or Email',
 placeholder: 'name or email',
 });
 */

AccountsTemplates.configure({
    // Behaviour
    confirmPassword: true,
    enablePasswordChange: true,
    overrideLoginErrors: true,
    sendVerificationEmail: true,

    // Appearance
    showForgotPasswordLink: true,
    showLabels: true,
    showPlaceholders: true,


    // Redirects
    homeRoutePath: '/',
    redirectTimeout: 4000,


    // Texts
    texts: {
     
      title: {
          forgotPwd: "Recover Your Passwod"
      },
    },
});