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

    app.get("/home", isAuthenticated, findSnippets, findTop, renderIndex); //Home render

    app.get("/snippets/:language", isAuthenticated, findSnippetsbyLanguage, findTop, renderIndex); //Renders only that language

    app.get("/users/:username", isAuthenticated, findByUser, findTop, renderIndex); //Renders user

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
            include: [{ all: true }],
            limit: 50,
            order: [["createdAt", "DESC"]]
        }).then(data => {
            req.header = "Viewing most recent Snippets ...";
            req.snippets = data;
            next();
        });
    }

    function findSnippetsbyLanguage(req, res, next) {
        var language = req.params.language;
        db.Snippet.findAll({
            where: {
                language: language
            },
            limit: 50,
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: db.User,
                    attributes: {
                        exclude: ["fullName", "password"]
                    }
                },
                { model: db.Comment, include: [db.User] }]
        }).then(language => {
            req.header = "Viewing " + req.params.language + " Snippets...";
            req.snippets = language; 
            next();
        });
    }

    function findByUser (req, res, next) {
        db.User.findOne({
            attributes: {
                exclude: ["password"]},
            where: {
                username: req.params.username
            },
            include: [ //includes both snippets from that author and their comments, this will be useful later.
                {
                    model: db.Snippet,
                    include: [
                        { model: db.Comment, 
                            include: {
                                model: db.User,
                                attributes: {
                                    exclude: ["fullName", "password"]}
                            } 
                        }
                    ]
                },
                {
                    model: db.Comment
                }
            ],
            // limit: [[db.Snippet, 50]],
            order: [[{model: db.Snippet, as: "Snippets"}, "createdAt", "DESC"]]
        }).then(data => {
            req.header = "Viewing " + data.username + "'s Snippets...";
            req.snippets = data.Snippets;
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
                if (langArray.length < 4)
                    langArray.push(lang[0]);
            });
            
            req.trending = langArray;
            next();
        });
    }

    function renderIndex(req, res, string) {
        res.render("index", {
            header: req.header,
            snippets: req.snippets,
            trending: req.trending,
            currentUser: req.user
        });
    }
};
