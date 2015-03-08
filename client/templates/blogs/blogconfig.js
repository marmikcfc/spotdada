if (Meteor.isClient) {
  Blog.config({
    blogIndexTemplate: 'myBlogIndexTemplate',
    blogShowTemplate: 'myShowBlogTemplate'
  });
}