const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("sqlite::memory:", { logging: false });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = sequelize.define("User", {
    userName: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: "user" }
}, { timestamps: false });

module.exports = db;
