const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class RoleRequest extends Model {}

    RoleRequest.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "ID"
                }
            },
            reason: {
                type: DataTypes.TEXT, 
                allowNull: false
            },
            requested_role: {
                type: DataTypes.ENUM("Étterem kritikus", "Játszótér szakértő", "Iskológus", "Vegyesbolt vegyész"), 
                allowNull: false
            },
            status: {
                type: DataTypes.ENUM("pending", "approved", "rejected"),
                defaultValue: "pending",
                allowNull: false
            },
            processed_by: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: "Users", 
                    key: "ID"
                }
            }
        },
        {
            sequelize,
            modelName: "RoleRequests",
            timestamps: true, 
            freezeTableName: true
        }
    );

    return RoleRequest;
};
