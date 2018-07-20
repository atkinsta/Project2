var isAuthenticatd = require("../config/middleware/isAuthenticated");
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

    app.get("/home", isAuthenticatd, (req, res) => {
        res.render("index");
    });

    // app.get("/test", (req, res) => {
    //     db.Snippet.findAll({
    //         include: [
    //             {all: true}]
    //     }).then(allSnippets => {
    //         console.log(allSnippets);
    //         res.render("index", {snippets: allSnippets, comments: allSnippets.Comments});
    //     });
    // });

    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
        res.render("404");
    });
};