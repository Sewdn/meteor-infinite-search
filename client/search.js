var lastQuery = "";

Session.setDefault('pageSize', 6);
Session.setDefault('page', 0);
Session.setDefault('loading', true);

Search = new SearchSource('search', ['title', 'content'], {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
});

Template.search.onCreated(function(){
  var self = this;
  self.autorun(function(){
    var size = Session.get('pageSize'),
        page = Session.get('page');
    if(!!lastQuery){
      Search.search(lastQuery, {
        skip: page*size,
        limit: size
      });
    }
  });
});

Template.search.helpers({
  'results': function(){
    var size, page;
    Tracker.nonreactive(function(){
      size = Session.get('pageSize');
      page = Session.get('page');
    });

    return Search.getData({
      transform: function(matchText, regExp) {
        return matchText.replace(regExp, "<em>$&</em>");
      },
      limit:(page+1)*size
    }, true);
  },
  'loading': function(){
    var state = Search.getStatus();
    return !!state.loading;
  }
});

Template.search.events({
  "keyup input": _.throttle(function(e, t) {
    var query = $(e.target).val().trim();
    if(query && query.length > 0){
      if(query !== lastQuery){
        Session.set('page', 0);
        var size = Session.get('pageSize');
        lastQuery = query;

        Search.search(query, {
          skip: 0,
          limit: size
        });
      }
    } else {
      //clear result
      lastQuery = query;
      Search.store.remove({});
    }
  }, 500)
});
