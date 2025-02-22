const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Restaurant extends Model {}

    Restaurant.init(
        {
            ID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
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
            type: {
                type: DataTypes.STRING(255)
            },
        },
        {
            sequelize,
            modelName: "Restaurants",
            timestamps: false,
            freezeTableName: true
        }
    );

    return Restaurant;
};
