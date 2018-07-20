var db = require("../models");

module.exports = function(app) {

    app.get("/", function(req, res) {
        if (req.user) {
            res.redirect("/home");
        }
        res.render("login");
    });

    app.get("/login", (req, res) => {
        if (req.user) {
            res.redirect("/home");
        }
        res.render("login");
    });

    app.get("/signup", (req, res) => {
        if (req.user) {
            res.redirect("/home");
        }
        res.render("signup");
    });

    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
        res.render("404");
    });
};