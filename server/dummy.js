Meteor.startup(function(){
  //check if content is present
  var content = Content.findOne({});
  if(!content){
    var flavours = [
      'classic',
      'cicero_1_10_32',
      'cicero_1_10_33',
      'jabberwocky'
    ];
    _.each(_.range(100), function(i){
      dimsum.configure({ flavor: flavours(i%4) });
      Content.insert({
        title: dimsum.sentence(),
        content: dimsum()
      });
    });
  }
});

Meteor.publish('allContent', function(){
  return Content.find({});
});