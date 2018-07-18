var db = require("../models");
var passport = require("../config/passport.js");

module.exports = function(app) {

    app.get("/api/snippets", (req, res) => {
        
    });

    app.get("/api/snippets/:author", (req, res) => {
        //get all snippets by author
    });

    app.get("/api/snippets/:language", (req, res) => {
        //get all snippets by langage
    });

    app.get("/api/snippets/:sort", (req, res) => {
        //get all snippets, sort by (date/hot/most likes)
    })

    app.post("/api/snippets", (req, res) => {

    });

    app.put("/api/snippets/:id", (req, res) => {
        //update snippet where id = ?
    });

    app.delete("/api/snippets/:id", (req, res) => {
        //delete snippet where id = ?
    });













    app.post("/api/login", passport.authenticate("local"), (req, res) => {
        res.json("/home");
    });

    app.post("/api/signup", (req, res) => {
        db.User.create({
            username: req.body.username,
            fullName: req.body.fullName,
            password: req.body.password
        }).then( () => {
            res.redirect(307, "/api/login");
        }).catch(err => {
            console.log(err);
            res.json(err);
        });
    });

    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });

    app.get("/api/user_data", (req, res) => {
        if (!req.user) {
            res.json();
        }
        else {
            res.json({
                email: req.user.email,
                id: req.user.id
            });
        }
    });

};
