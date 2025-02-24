const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {}

    User.init(
        {
            ID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            userName: {
                type: DataTypes.STRING(100),
                allowNull: false, 
            },
            ProfilePicture: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            password: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true
            },
            role: {
                type: DataTypes.STRING(20),
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: "Users",
            timestamps: false,
            freezeTableName: true
        }
    );

    return User;
};
