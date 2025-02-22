const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Place extends Model {}

    Place.init(
        {
            ID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            user_rate: {
                type: DataTypes.INTEGER 
            },
            critic_rate: {
                type: DataTypes.INTEGER 
            },
            added_date: {
                type: DataTypes.DATE,
                allowNull: false
            },
            visits: {
                type: DataTypes.INTEGER 
            },
            location: {
                type: DataTypes.STRING(255)
            },
            text: {
                type: DataTypes.STRING(255)
            },
            topic_ID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Topics",
                    key: "ID"
                }
            }
        },
        {
            sequelize,
            modelName: "Places",
            timestamps: false,
            freezeTableName: true
        }
    );

    return Place;
};
