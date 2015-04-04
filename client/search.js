Session.setDefault('pageSize', 6);
Session.setDefault('page', 0);
Session.setDefault('loading', true);

Template.search.onRendered(function(){
  var self = this;
  self.lastNode._uihooks = {
    insertElement: function(node, next) {
      $(node).css('opacity', 0)
             .insertBefore(next)
             .velocity({
        opacity:[1,0]
      }, {
        easing: 'easeOutQuad',
        duration: 200,
        queue: false
      });
    },
    removeElement: function (node) {
      $(node).velocity({
        opacity:[0, 1]
      }, {
        easing: 'easeOutQuad',
        duration: 200,
        queue: false,
        complete: function(){
          $(node).remove();
        }
      });
    }
  };
});

Template.search.helpers({
  'results': function(){
    var size = Session.get('pageSize'),
        page = Session.get('page');
    return Content.find({}, {skip:page*size, limit:size});
  },
  'loading': function(){
    return Session.get('loading');
  }
});


Meteor.subscribe('allContent');