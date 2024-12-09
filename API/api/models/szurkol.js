const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Szurkol extends Model {}

    Szurkol.init(
        {
            csapatAzonosító: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Csapatok", // Hivatkozott tábla
                    key: "azonosító"
                },
                primaryKey: true
            },
            szurkolóAzonosító: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Szurkolók", // Hivatkozott tábla
                    key: "szigSzám"
                },
                primaryKey: true
            }
        },
        {
            sequelize,
            modelName: "Szurkol",
            timestamps: false,
            freezeTableName: true
        }
    );

    return Szurkol;
};
