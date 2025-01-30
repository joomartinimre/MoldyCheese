const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize
(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,

    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: false,
    }
)

try
{
    sequelize.authenticate();

    console.log("Database Connection Successful");
}
catch(error)
{
    console.log(error.message);
}

const db = {};

const { Comment, Playground, Restaurant, School, Shop, Topic, User} = require("../models")(sequelize, DataTypes);

db.Comment = Comment;

db.Playground = Playground;

db.Restaurant = Restaurant;

db.School = School;

db.Shop = Shop;

db.Topic = Topic;

db.User = User;

db.Sequelize = Sequelize;

db.sequelize = sequelize;

db.sequelize.sync({ alter: true });

module.exports = db;