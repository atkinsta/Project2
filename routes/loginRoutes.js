var db = require("../models");
var passport = require("../config/passport.js");   

module.exports = function (app) {
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
                username: req.user.username,
                id: req.user.id,
                fullName: req.user.fullName
            });
        }
    });
};