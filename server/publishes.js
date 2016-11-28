Meteor.publish("websites", function(){
  return Websites.find();
});

Meteor.publish("comments", function(){
  return Comments.find();
});

Meteor.publish("likes", function(){
  if(this.userId) {
    return Likes.find({userId: this.userId});
  }
});
