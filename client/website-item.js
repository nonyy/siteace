Template.websiteItem.helpers({
  'getLikeIconColor': function() {
    if (Meteor.user()) {
      var userId = Meteor.user()._id;
      var websiteId = this._id;
      var like = Likes.findOne({
        userId: userId,
        websiteId: websiteId,
        type: 1
      });
      if (like) {
        return 'green'
      }
    }
  },
  'getUnlikeIconColor': function() {
    if (Meteor.user()) {
      var userId = Meteor.user()._id;
      var websiteId = this._id;
      var unlike = Likes.findOne({
        userId: userId,
        websiteId: websiteId,
        type: -1
      });
      if (unlike) {
        return 'red'
      }
    }
  },
  'getViewerColor': function() {
    var currentWebsiteVotes = Websites.findOne({
      _id: this._id
    }).votes;
    if (currentWebsiteVotes > 0) {
      return 'green'
    } else if (currentWebsiteVotes < 0) {
      return 'red'
    }
  }
});


Template.websiteItem.events({
  'click .js-upvote': function(event) {
    if(Meteor.userId()) {
      Meteor.call("like", 1, this._id, function() {
        Session.set('changed', true);
      });
    }

  },
  'click .js-downvote': function(event) {
    if(Meteor.userId()) {
      Meteor.call("like", -1, this._id, function() {
        Session.set('changed', true);
      })
    }
  }

});
