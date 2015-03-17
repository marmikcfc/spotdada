Package.describe({
  name: 'marmikcfc:unblock',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});



Package.onUse(function(api) {
   configurePackages(api);

});

Package.onTest(function(api) {
  configurePackages(api);

  api.use('tinytest');

  api.add_files('test/unblock.js', 'server');
});


function configurePackages (api) {
    api.versionsFrom('1.0.3.2');
   api.use('meteorhacks:meteorx@1.0.2');
  api.add_files('lib/unblock.js', 'server');
  
}