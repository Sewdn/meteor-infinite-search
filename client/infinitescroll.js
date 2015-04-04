var scrollListener = _.debounce(function() {
  var diff = $(document).height()-$(window).height();
  // All the taxing stuff you do
  if ($(window).scrollTop() === diff){
    Session.set('page', Session.get('page') + 1);
  }
}, 50);

Template.search.onCreated(function(){
  window.addEventListener('scroll', scrollListener);
});

Template.search.onDestroyed(function(){
  window.removeEventListener('scroll', scrollListener);
});