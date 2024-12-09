const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Topic extends Model {}

    Topic.init(
        {
            ID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING(50),
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: "Topics",
            timestamps: false,
            freezeTableName: true
        }
    );

    return Topic;
};
