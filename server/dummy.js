Meteor.startup(function(){
  //check if content is present
  var content = Content.findOne({});
  if(!content){
    var flavours = [
      'latin',
      'jabberwocky'
    ];
    _.each(_.range(100), function(i){
      dimsum.configure({ flavor: flavours[i%flavours.length] });
      Content.insert({
        title: dimsum.sentence(1),
        content: dimsum(),
        created: new Date()
      });
    });
  }
});
