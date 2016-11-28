function getKeywords(text) {
    var textLowercased = text.toLowerCase();
    var keywords = textLowercased.match(/[a-z]+/g);
    return keywords;
}


Template.websiteList.helpers({
    websites: function() {
        if (Session.get('searched')) {
            return Session.get('searched');
        } else {
            return Websites.find({}, {
                sort: {
                    votes: -1,
                    createdOn: -1,
                }
            });
        }

    },
    username: function() {
        return Meteor.user().username;
    },
    getRecommended: function() {
        if (Meteor.user()) {
            var currentUser = Meteor.user()._id;
            (currentUser);
            var userLikes = Likes.find({
                userId: currentUser,
                type: 1
            }).fetch();

            var websitesLikedOrCommented = [];
            var userLikesCount = userLikes.length;

            for (var i = 0; i < userLikesCount; i++) {
                websitesLikedOrCommented.push(userLikes[i].websiteId);
            }

            var userComments = Comments.find({
                userId: currentUser
            }).fetch();

            var userCommentsCount = userComments.length;
            for (var i = 0; i < userCommentsCount; i++) {
                websitesLikedOrCommented.push(userComments[i].websiteId);
            }



            websitesLikedOrCommented = _.uniq(websitesLikedOrCommented);

            var allWebsites = Websites.find().fetch();
            var allWebsitesCount = allWebsites.length;
            var allWebsitesIds = [];
            for (var i = 0; i < allWebsitesCount; i++) {
                allWebsitesIds.push(allWebsites[i]._id);
            }

            var websitesNotUsed = _.difference(allWebsitesIds, websitesLikedOrCommented);

            var websitesNotUsedCount = websitesNotUsed.length;

            if (websitesNotUsedCount == 1) {

                return Websites.findOne({
                    _id: websitesNotUsed[0]
                });
            }
            if (websitesNotUsedCount == 0) {

                return undefined;
            }

            var websitesLikedOrCommentedCount = websitesLikedOrCommented.length;
            var keywords = [];
            for (var i = 0; i < websitesLikedOrCommentedCount; i++) {
                var LocalWebsiteId = websitesLikedOrCommented[i];
                var localWebsiteTitle = Websites.findOne({
                    _id: LocalWebsiteId
                }).title;
                var LocalKeywords = getKeywords(localWebsiteTitle);
                var localWebsiteDescription = Websites.findOne({
                    _id: LocalWebsiteId
                }).description;
                var localKeywordsDescription = getKeywords(localWebsiteDescription);
                keywords = keywords.concat(LocalKeywords);
                keywords = keywords.concat(localKeywordsDescription);
            }
            keywords = _.uniq(keywords);
            var keywordsCount = keywords.length;

            var resultArray = [];

            for (var i = 0; i < websitesNotUsedCount; i++) {
                var localWebsiteId = websitesNotUsed[i];

                var localWebsite = Websites.findOne({
                    _id: localWebsiteId
                });

                var localWebsiteText = localWebsite.title + ' ' + localWebsite.description;

                var points = 0;
                for (var j = 0; j < keywordsCount; j++) {
                    var localKeyword = keywords[j];
                    var localKeywordRe = new RegExp(localKeyword, 'ig');
                    var matching = localWebsiteText.match(localKeywordRe);
                    if (matching) {
                        points += matching.length;
                    }

                }
                var localAraray = [localWebsiteId, points];
                resultArray.push(localAraray);
            }
            resultArray.sort(function(a, b) {
                return b[1] - a[1]
            });


            var most = Websites.findOne({
                _id: resultArray[0][0]
            });
            return most;
        }
    }



});

Template.websiteList.events({
    "input #search": function(event) {
        var toSearch = $("#search").val();
        let cursor = WebsitesIndex.search(toSearch);
        Session.set('searched', cursor.fetch());
    },
    "click .js-see-more": function(event) {

        $("#seeMore").toggle('fast');
    }
});
