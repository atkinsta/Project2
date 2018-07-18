// Create Users Table
// username, full name, ...

var bcrypt = require("bcrypt-nodejs");

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: true,
                max: 25
            }
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    
    // add associations


    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };

    User.hook("beforeCreate", function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });
    return User;
};