var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

    app.get("/api/snippets", (req, res) => {
        //get all snippets
        db.Snippet.findAll({

            include: [
                {
                    model: db.User,
                    attributes: {
                        exclude: ["fullName", "password"]
                    }
                },
                { model: db.Comment, include: [db.User] }]

        }).then(allSnippets => {
            res.json(allSnippets);
        });
    });

    app.get("/home", isAuthenticated, (req, res) => {
        db.Snippet.findAll({
            include: [{ all: true }]
        }).then(data => {
            res.render("index", { snippets: data });
        });
    });

    app.get("/api/snippets/:username", (req, res) => {
        //get all snippets by author
        db.User.findAll({
            attributes: {
                exclude: [fullName, password]
            },
            where: {
                username: req.params.username,

            },
            include: [ //includes both snippets from that author and their comments, this will be useful later.
                {
                    model: db.Snippet, include: [
                        { model: db.Comment, include: [db.User] }
                    ]
                }
            ]
        }).then(author => {
            res.json(author);
        });
    });

    app.get("/api/snippets/:language", (req, res) => {
        //get all snippets by langage
        db.Snippet.findAll({
            where: {
                language: req.params.language
            }
        }).then(language => {
            res.json(language);
        });
    });

    app.post("/api/snippets", (req, res) => {
        db.Snippet.create({
            title: req.body.title,
            language: req.body.language,
            codeBlock: req.body.codeBlock,
            description: req.body.description,
            UserId: req.user.id
        }).then(newSnippet => {
            res.json(newSnippet);
        });
    });

    app.post("/api/comments", (req, res) => {
        db.Comment.create({
            comment: req.body.comment,
            username: req.user.username,
            UserId: req.user.id,
            SnippetId: req.body.SnippetId
        }).then(newComment => {
            res.json(newComment);
        });
    });

    app.put("/api/snippets/:id", (req, res) => {
        //update snippet where id = ?
        db.Snippet.update(
            req.body,
            {
                where: {
                    id: req.params.id
                }
            }).then(updated => {
            res.json(updated);
        });
    });

    app.delete("/api/snippets/:id", (req, res) => {
        //delete snippet where id = ?
        db.Snippet.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => {
            res.end();
        });
    });
};
