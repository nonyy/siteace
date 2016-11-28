function clearContentInput() {
    $('#title').val('');
    $('#description').val('');
}

Template.websiteForm.onRendered = function() {
    Session.set('error', false);
}

Template.websiteForm.events({
    "input #url": function(event) {
        var url = $('#url').val();
        var re = /(https?):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?/
        if (url) {
            Session.set('error', false);
            if (url.match(re)) {
                $('#info').html('The url: ' + url + ' seems to be correct. Now loading auto content getting... please wait.');
                Session.set('error', false);
                Meteor.call('getAutoWebsiteData', url, function(err, result) {
                    if (err) {
                        $('#info').html("No, this url isn't correct... moreover, it seems to nonexist.");
                        clearContentInput();
                        Session.set('error', true);
                    } else {
                        var currentValue = $('#title').val();
                        if (result && result.title) {

                            $('#title').val(result.title);
                            $('#description').val(result.description);
                            $('#info').html("Auto content worked! If you don't see the description, it means that the website doesn't support this, unfortunately.");
                        } else {
                            $('#info').html("Sorry... auto content getting failed. Probably the site you typed doesn't support this feature.");
                        }
                        Session.set('error', false);
                    }
                });
            } else {
                $('#info').html('The url: ' + url + ' seems to be incorrect.');
                clearContentInput();
                Session.set('error', true);
            }
        } else {
            $('#info').html('');
            clearContentInput();
            Session.set('error', true);

        }

        return false;
    },

    "submit .js-save-website-form": function(event) {
        event.preventDefault();
        var title = $('#title').val();
        var url = $('#url').val();
        var description = $('#description').val();

        if ((Session.get('error') == false) && title && description) {
            var websiteData = {
                title: title,
                url: url,
                description: description,
            };

            Meteor.call("addWebsite", websiteData);
            $('#info').html('');
            event.target.url.value = '';
            clearContentInput();
        }

    }
});
