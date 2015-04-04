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
        delay: 1000,
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
  pageState: function(){
    var size = Session.get('pageSize'),
        page = Session.get('page');
    return [page*size, (page+1)*size].join('&nbsp;-&nbsp;');
  }
});