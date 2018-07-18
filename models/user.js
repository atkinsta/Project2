// Create Users Table
// username, full name, ...

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
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
        }
    });

    // add associations

    return User;
};