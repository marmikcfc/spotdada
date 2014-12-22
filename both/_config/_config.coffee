@Config =
	name: 'Spotdada'
	title: 'Create Connections'
	subtitle: 'Find beautiful projects to work on really fast'
	logo: ->
		'<b>' + @name + '</b>'
	footer: ->
		@name + ' - Copyright ' + new Date().getFullYear()
	emails:
		from: 'noreply@' + Meteor.absoluteUrl()
	username: false
	homeRoute: '/'
	dashboardRoute: '/dashboard'
	socialMedia:
		facebook:
			url: 'http://facebook.com/marmik.pandya.5'
			icon: 'facebook'
		twitter:
			url: 'http://twitter.com/thepiper93'
			icon: 'twitter'
		github:
			url: 'http://github.com/marmikcfc'
			icon: 'github'
	publicRoutes: ['home']