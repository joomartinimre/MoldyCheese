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
            NumberOfRate_L: {
                type: DataTypes.INTEGER 
            },
            NumberOfRate_C: {
                type: DataTypes.INTEGER 
            },
            Likes: {
                type: DataTypes.INTEGER 
            },
            Picture: {
                type: DataTypes.BLOB("long"),
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            visits: {
                type: DataTypes.INTEGER 
            },
            text: {
                type: DataTypes.STRING(2000)
            },
            tags: {
                type: DataTypes.JSON, // MySQL esetén JSON típus
                allowNull: true,
                defaultValue: [] // alapértelmezettként üres tömb
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
            timestamps: true,
            freezeTableName: true
        }
    );

    return Place;
};
