SearchSource.defineSource('search', function(searchText, options) {
  var results = [];
  options = _.extend({
    skip: 0,
    limit: 50,
    sort: {created: -1}
  }, options);
  if(searchText) {
    var parts = searchText.trim().split(' '),
        regExp = new RegExp("(" + parts.join('|') + ")", "ig"),
        selector = {$or: [{title: regExp}, {content: regExp}, {tags: {$in: [regExp]}}]};
    results = Content.find(selector, options).fetch();
  } else {
    results = Content.find({}, options).fetch();
  }
  return results;
});