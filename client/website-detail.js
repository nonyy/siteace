Template.websiteDetail.helpers({
  comments: function() {
    return Comments.find({
      websiteId: this._id
    }, {
      sort: {
        createdOn: -1
      }
    });
  },
});

Template.websiteDetail.events({
  "submit .js-comment-form": function(event) {
    event.preventDefault();
    if (Meteor.user()) {
      var commentData = {
        content: event.target.inputComment.value,
        websiteId: this._id,
      }
      Meteor.call("addComment", commentData);
    }

  }
});
