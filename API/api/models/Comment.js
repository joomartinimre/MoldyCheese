const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {}

    Comment.init(
        {
            ID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            // User_ID: {
            //     type: DataTypes.INTEGER,
            //     allowNull: false,
            // },
            // Place_ID: {
            //     type: DataTypes.INTEGER,
            //     allowNull: false,
            // },
            text: {
                type: DataTypes.STRING(255)
            },
            rate: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: "Comments",
            timestamps: false,
            freezeTableName: true
        }
    );

    return Comment;
};
