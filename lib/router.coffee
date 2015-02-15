

@ProjectsListController = RouteController.extend(
  template: @template
  increment: 5
  postsLimit: ->
    parseInt(@params.postsLimit) or @increment

  findOptions: ->
    sort: @sort
    limit: @postsLimit()

  subscriptions: ->
    @projectsSub = Meteor.subscribe("projects", @findOptions())
    return

  projects: ->
    Projects.find {}, @findOptions()

  data: ->
    hasMore = @projects().count() is @postsLimit()

    projects: @projects()
    ready: @projectsSub.ready
    nextPath: (if hasMore then @nextPath() else null)
)

@NewProjectsController = ProjectsListController.extend(
  template: "projectLists"
  sort:
    submitted: -1
    _id: -1

  nextPath: ->
    Router.routes.newProjects.path postsLimit: @postsLimit() + @increment
)

@BestProjectsController = ProjectsListController.extend(
  template: "projectLists"
  sort:
    votes: -1
    submitted: -1
    _id: -1

  nextPath: ->
    Router.routes.bestProjects.path postsLimit: @postsLimit() + @increment
)

@FollowingProjectsController = RouteController.extend(
  template: 'followingProjects'
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
    @projectsSub = Meteor.subscribe("followingProjects", @params.username, @findOptions())
    return

  projects: ->
    Projects.find {}

  nextPath: ->
    Router.routes.followingProjects.path 
      username: @params.username
      postsLimit: @postsLimit() + @increment

  data: ->
    if @projects()
      hasMore = @projects().count() is @postsLimit()

    projects: @projects()
    ready: @projectsSub.ready
    nextPath: (if hasMore then @nextPath() else null)
)


Router.route "/new/:postsLimit?",
  name: "newProjects"

Router.route "/best/:postsLimit?",
  name: "bestProjects"

Router.route "/:username/followingProjects/:postsLimit?",
  name: "followingProjects"

# One Recipe Page
Router.route '/projects/:_id',
  name: 'projectPage'
  waitOn: ->
    [
      Meteor.subscribe 'oneRecipe', @params._id
      Meteor.subscribe 'comments', @params._id
    ]
    
  data: ->
    Projects.findOne @params._id

# One Recipe Edit Page
Router.route '/projects/:_id/edit',
  name: 'projectEdit'
  waitOn: ->
    Meteor.subscribe 'oneRecipe', @params._id

  data: ->
    Projects.findOne @params._id


# Posting Recipe
Router.route '/post-project',
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
    @projectsSub = Meteor.subscribe("myProjects", @params.username, @findOptions())
    [
      @projectsSub 
      Meteor.subscribe 'oneUser', @params.username
    ]
  user: ->
    Meteor.users.find 
      username: @params.username

  projects: ->
    Projects.find {}

  nextPath: ->
    Router.routes.profile.path 
      username: @params.username
      postsLimit: @postsLimit() + @increment

  data: ->
    hasMore = @projects().count() is @postsLimit()

    projects: @projects()
    user: @user()
    ready: @projectsSub.ready
    nextPath: (if hasMore then @nextPath() else null)
)





