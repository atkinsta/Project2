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

    app.get("/home", isAuthenticated, findSnippets, findTop, renderIndex);


    app.get("/posts/:langage", (req, res) => {
        //get all snippets by langage
        var language = req.params.language;
        db.Snippet.findAll({
            where: {
                language: language
            },
            include: [
                {
                    model: db.User,
                    attributes: {
                        exclude: ["fullName", "password"]
                    }
                },
                { model: db.Comment, include: [db.User] }]
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

    // Post comments
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

    // get comments
    app.get("/api/comments", (req,res) => {
        db.Comment.findAll({}).then (allComments => {
            res.json(allComments);
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

    function findSnippets(req, res, next) {
        db.Snippet.findAll({
            include: [{ all: true }]
        }).then(data => {
            req.snippets = data;
            next();
        });
    }

    function findTop(req, res, next) {
        db.Snippet.findAll({}).then(data => {
            
            const dataMap = {};
            data.forEach(post => {
                dataMap[post.language] = dataMap[post.language] + 1 || 1;
            });
            const sortable = [];
            for (var language in dataMap) {
                sortable.push([language, dataMap[language]]);
            }
            sortable.sort(function(a, b) {
                return b[1] - a[1];
            });
            
            const langArray = [];
            sortable.forEach(lang => {
                langArray.push(lang[0]);
            });
            next();
            req.trending = dataMap;
        });
    }

    function renderIndex(req, res) {
        res.render("index", {
            snippets: req.snippets,
            trending: req.trending,
            user: req.user
        });
    }
};
