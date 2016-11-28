Meteor.methods({
    getAutoWebsiteData: function(url) {
        var title, description;
        var response = HTTP.get(url);
        
        if (response.statusCode === 200) {
            var $ = cheerio.load(response.content);
            title = $('title').text() || "";
            description = $('meta[name=description]').attr("content") || "";
        }
        return {
            title: title,
            description: description
        };
    }
});
