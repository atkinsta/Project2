var db = require("../models");

module.exports = function(app) {

    app.get("/api/snippets", (req, res) => {
        //get all snippets
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
};
