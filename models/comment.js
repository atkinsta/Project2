// Create comments
// comment text

module.exports = function (sequelize, DataTypes) {
    var Comment = sequelize.define("Comment", {
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true
            }
        }
    });

    Comment.associate = function(models) {
        Comment.belongsTo(models.Snippet, {
            foreignKey: {
                allowNull: false
            }
        });
        Comment.belongsTo(models.User, {
            foriegnKey: {
                allowNull: false
            }
        });
    };
    // add associations

    return Comment;
};