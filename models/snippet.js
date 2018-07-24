// Create Posts Table
// title, language, code, description...

module.exports = function (sequelize, DataTypes) {
    var Snippet = sequelize.define("Snippet", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: 50
            }
        },
        language: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: 15
            }
        },
        codeBlock: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                max: 500
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: 255
            }
        }
    });

    Snippet.associate = function (models) {
        Snippet.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        Snippet.hasMany(models.Comment, {
            onDelete: "cascade"
        });
    };

    return Snippet;
};
