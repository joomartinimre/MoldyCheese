const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {

    }

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
                type: DataTypes.BLOB("long"),
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
                type: DataTypes.ENUM("Étterem kritikus", "Játszótér szakértő", "Iskológus", "Vegyesbolt vegyész", "Admin", "User"), defaultValue: "User", 
                allowNull: false,
                validate:{
                    isIn:{
                        args: [["Étterem kritikus", "Játszótér szakértő", "Iskológus", "Vegyesbolt vegyész", "Admin", "User"]],
                        msg: "A role-nak létezőnek kell lennie!"
                    }
                }
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
