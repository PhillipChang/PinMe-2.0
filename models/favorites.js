module.exports = function(sequelize, DataTypes) {
    var Favorite = sequelize.define("Favorite", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 50]
            }
        },
        desc: {
            type:  DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 100]
            }
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true
            }
        }
    });
    Favorite.associate = function(models) {
        Favorite.belongsTo(models.User, {
        });
    };

    return Favorite;
};