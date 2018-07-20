require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var session = require("express-session");
var passport = require("./config/passport.js");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(session({ secret: "snippy man", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/snippets-apiRoutes")(app);
require("./routes/user-apiRoutes")(app);
require("./routes/htmlRoutes")(app);
require("./routes/loginRoutes")(app);

var syncOptions = { force: false };

if (process.env.NODE_ENV === "test") {
    syncOptions.force = true;
}

db.sequelize.sync(syncOptions).then(function() {
    app.listen(PORT, function() {
        console.log("Listening on port: " + PORT);
    });
});

module.exports = app;
