var db = require("../models");

module.exports = function (app) {

    app.get("/api/snippets", (req, res) => {
        //get all snippets
        db.Snippet.findAll({

        }).then(allSnippets => {
            res.json(allSnippets);
        });
    });

    app.get("/api/snippets/:username", (req, res) => {
        //get all snippets by author
        db.Snippet.findAll({
            where: {
                username: req.params.username
            }
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

    // app.get("/api/snippets/:sort", (req, res) => {
    //     //get all snippets, sort by (date/hot/most likes)
    //     .then(sort => {
    //         res.json(sort);
    //     });
    // });

    app.post("/api/snippets", (req, res) => {
        db.Snippet.create(req.body).then(newSnippet => {
            res.json(newSnippet);
        });
    });

    app.post("/api/snippets/newComment", (req, res) => {
        db.Comment.create({
            comment: req.body.comment,
            user: req.body.username,
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
