Content = new Mongo.Collection('content');

if(Meteor.isServer) {
  Content._ensureIndex({title: 1, content: 1, created: 1});
}
