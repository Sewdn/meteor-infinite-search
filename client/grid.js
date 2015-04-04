Template.masonryGrid.onRendered(function(){
  var self = this;
  self.masonry = new Masonry( self.firstNode, {
    //itemSelector: '.brick',
    gutter: 20
  });

  self.firstNode._uihooks = {
    insertElement: function(node, next) {
      $(node).insertBefore(next);
      self.masonry.appended(node);
      self.masonry.layout();
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
          self.masonry.remove(node);
          self.masonry.layout();
        }
      });
    }
  };
});

Template.masonryGrid.onDestroyed(function(){
  this.masonry.destroy();
});
