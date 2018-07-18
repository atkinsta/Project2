var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

passport.use(new LocalStrategy (
    function(username, password, done) {
        db.User.findOne({
            where: {
                username: username
            }
        }).then(dbUser => {
            if (!dbUser) {
                return done(null, false, {
                    messege: "Incorrect Username."
                });
            }
            else if (!dbUser.validPassport(password)) {
                return done(null, false, {
                    messege: "Incorrect Password."
                });
            }

            return done(null, dbUser);
        });
    }
));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

module.exports = passport;