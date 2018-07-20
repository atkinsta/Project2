var db = require("../models");

module.exports = function(app) {
    // Get all users usernames
    app.get("/api/users", function(req, res) {
        db.User.findAll({
            attributes: {
                exclude: ["password","fullName", "id"]},
            // add number of posts
            // add number of comments
        }).then(function(allUsers) {
            res.json(allUsers);
        });
    });

    // Get a user's snippets
    app.get("/api/users/:username", function(req, res) {
        db.User.findOne({
            attributes: {
                exclude: ["password"]},
            where: {
                username: req.params.username
            },
            include: [ //includes both snippets from that author and their comments, this will be useful later.
                {
                    model: db.Snippet
                },
                {
                    model: db.Comment
                }
            ]
        }).then(function(user) {
            res.json(user);
        });
    });


    // Create a new user ---- This is handled in login
    // app.post("/api/users", function(req, res) {
    //     db.User.create(
    //         req.body
    //     ).then(function(newUser) {
    //         res.json(newUser);
    //     });
    // });

    // Delete a user by id
    app.delete("/api/users/:id", function(req, res) {
        db.User.destroy(
            { 
                where: { id: req.params.id } 
            }).then(function() {
            res.end();
        });
    });
};
