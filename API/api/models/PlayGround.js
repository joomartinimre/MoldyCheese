const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Playground extends Model {}

    Playground.init(
        {
            ID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            // Topic_ID: {
            //     type: DataTypes.INTEGER,
            //     allowNull: false
            // },
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
            modelName: "Playgrounds",
            timestamps: false,
            freezeTableName: true
        }
    );

    return Playground;
};
