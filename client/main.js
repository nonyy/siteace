Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL",
});

UI.registerHelper('dateFor', function (date, format) {
  return moment(date).format(format);
});

Meteor.subscribe("websites");
Meteor.subscribe("comments");
Meteor.subscribe("likes");
