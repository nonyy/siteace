Meteor.methods({
  addWebsite: function(websiteData) {
    if (this.userId) {
      var website = {
        url: websiteData.url,
        title: websiteData.title,
        description: websiteData.description,
        votes: 0,
        createdOn: new Date(),
        createdBy: this.userId
      }

      Websites.insert(website);
    }
  },
  addComment: function(commentData) {
    if (this.userId) {
      var comment = {
        content: commentData.content,
        websiteId: commentData.websiteId,
        author: Meteor.user().username,
        createdOn: new Date(),
      }

      Comments.insert(comment);
    }
  },
  like: function(type, websiteId) {
    if (this.userId && Math.abs(type) == 1 && Websites.findOne({_id: websiteId})) {
      var userId = this.userId;
      var like = Likes.findOne({
        userId: userId,
        websiteId: websiteId
      });

      if (like) {
        if (like.type == type) {
          Likes.remove({_id: like._id  });
          Websites.update({_id: websiteId}, { $inc: {votes: -1 * type}});
        } else {
          Likes.update({
            _id: like._id
          }, {
            $set: {
              type: type
            }
          });
          Websites.update({
            _id: websiteId
          }, {
            $inc: {
              votes: 2 * type
            }
          });

        }
      } else {
        Websites.update({
          _id: websiteId
        }, {
          $inc: {
            votes: 1 * type
          }
        });
        Likes.insert({
          userId: userId,
          websiteId: websiteId,
          type: type
        });
      }
    }
  }
});
