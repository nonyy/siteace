Router.configure({
    layoutTemplate:"layout",
});

Router.route("/", function() {
    this.render("website-list", {to: "main"});
    this.render("navbar", {to: "navbar"});
});

Router.route('/:_id', function () {
    this.render('website-detail', { to:"main", data:function() {
        return Websites.findOne({_id:this.params._id});}
    });
    this.render("navbar", {to: "navbar"});
});
