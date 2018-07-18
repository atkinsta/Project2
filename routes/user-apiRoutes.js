var db = require("../models");

module.exports = function(app) {
    // Get all users usernames
    app.get("/api/users", function(req, res) {
        db.User.findAll({
            attributes: [username]
        }).then(function(allUsers) {
            res.json(allUsers);
        });
    });

     // Get a user's snippets
     app.get("/api/users/:id", function(req, res) {
        db.User.findOne({
            attributes: [username],
            where: {
                id: req.params.id
              },
              include: ["Snippets"]
        }).then(function(user) {
            res.json(user);
        });
    });


    // Create a new user
    app.post("/api/users", function(req, res) {
        db.User.create(
            req.body
        ).then(function(newUser) {
            res.json(newUser);
        });
    });

    // Delete a user by id
    app.delete("/api/users/:id", function(req, res) {
        db.User.destroy(
            { 
                where: { id: req.params.id } 
            }).then(function(user) {
            res.end();
        });
    });
};
