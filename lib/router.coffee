Router.configure
  layoutTemplate: 'layout'
  loadingTemplate: 'loading'
  notFoundTemplate: 'notFound'
  waitOn: ->
    [
      Meteor.subscribe 'notifications'
    ]

@RecipesListController = RouteController.extend(
  template: @template
  increment: 5
  postsLimit: ->
    parseInt(@params.postsLimit) or @increment

  findOptions: ->
    sort: @sort
    limit: @postsLimit()

  subscriptions: ->
    @recipesSub = Meteor.subscribe("recipes", @findOptions())
    return

  recipes: ->
    Recipes.find {}, @findOptions()

  data: ->
    hasMore = @recipes().count() is @postsLimit()

    recipes: @recipes()
    ready: @recipesSub.ready
    nextPath: (if hasMore then @nextPath() else null)
)

@NewRecipesController = RecipesListController.extend(
  template: "recipeLists"
  sort:
    submitted: -1
    _id: -1

  nextPath: ->
    Router.routes.newRecipes.path postsLimit: @postsLimit() + @increment
)

@BestRecipesController = RecipesListController.extend(
  template: "recipeLists"
  sort:
    votes: -1
    submitted: -1
    _id: -1

  nextPath: ->
    Router.routes.bestRecipes.path postsLimit: @postsLimit() + @increment
)

@FollowingRecipesController = RouteController.extend(
  template: 'followingRecipes'
  increment: 5

  postsLimit: ->
    parseInt(@params.postsLimit) or @increment

  findOptions: ->
    sort:
      submitted: -1
      votes: -1
      _id: -1
    limit: @postsLimit()

  subscriptions: ->
    @recipesSub = Meteor.subscribe("followingRecipes", @params.username, @findOptions())
    return

  recipes: ->
    Recipes.find {}

  nextPath: ->
    Router.routes.followingRecipes.path 
      username: @params.username
      postsLimit: @postsLimit() + @increment

  data: ->
    if @recipes()
      hasMore = @recipes().count() is @postsLimit()

    recipes: @recipes()
    ready: @recipesSub.ready
    nextPath: (if hasMore then @nextPath() else null)
)

Router.route "/",
  name: "home"

#Router.route "/",
#  name: "recipeLists"
#  controller: NewRecipesController

Router.route "/new/:postsLimit?",
  name: "newRecipes"

Router.route "/best/:postsLimit?",
  name: "bestRecipes"

Router.route "/:username/followingRecipes/:postsLimit?",
  name: "followingRecipes"

# One Recipe Page
Router.route '/recipes/:_id',
  name: 'recipePage'
  waitOn: ->
    [
      Meteor.subscribe 'oneRecipe', @params._id
      Meteor.subscribe 'comments', @params._id
    ]
    
  data: ->
    Recipes.findOne @params._id

# One Recipe Edit Page
Router.route '/recipes/:_id/edit',
  name: 'recipeEdit'
  waitOn: ->
    Meteor.subscribe 'oneRecipe', @params._id

  data: ->
    Recipes.findOne @params._id


# Posting Recipe
Router.route '/post-recipe',
  name: 'postRecipe'



# User' followings
Router.route '/users/:username/followings',
  name: 'followings'
  waitOn: ->
    [
      Meteor.subscribe 'oneUser', @params.username
      Meteor.subscribe 'followings', @params.username
    ]
  data: ->
    Meteor.users.find
      followers: @params.username

# User' followers
Router.route '/users/:username/followers',
  name: 'followers'
  waitOn: ->
    [
      Meteor.subscribe 'oneUser', @params.username
      Meteor.subscribe 'followers', @params.username
    ]
  data: ->
    Meteor.users.find
      followings: @params.username


# User profile
@ProfileController = RouteController.extend(
  template: 'profile'
  increment: 5
  postsLimit: ->
    parseInt(@params.postsLimit) or @increment

  findOptions: ->
    sort:
      submitted: -1
      votes: -1
      _id: -1
    limit: @postsLimit()

  subscriptions: ->
    @recipesSub = Meteor.subscribe("myRecipes", @params.username, @findOptions())
    [
      @recipesSub 
      Meteor.subscribe 'oneUser', @params.username
    ]
  user: ->
    Meteor.users.find 
      username: @params.username

  recipes: ->
    Recipes.find {}

  nextPath: ->
    Router.routes.profile.path 
      username: @params.username
      postsLimit: @postsLimit() + @increment

  data: ->
    hasMore = @recipes().count() is @postsLimit()

    recipes: @recipes()
    user: @user()
    ready: @recipesSub.ready
    nextPath: (if hasMore then @nextPath() else null)
)
Router.route '/users/:username/:postsLimit?',
  name: 'profile'


Router.route '/search',
  name: 'search'
  waitOn: ->
    Meteor.subscribe("recipes", 
      sort: 
        submitted: -1
        votes: -1
        _id: -1
      limit: 10
    )

requireLogin = ->
  unless Meteor.user()
    if Meteor.loggingIn()
      @render @loadingTemplate
    else
      Router.go '/'
  else
    @next()
  return

Router.onBeforeAction requireLogin,
  only: 
    [
      "postRecipe"
    ]