const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({ dialect: "sqlite", storage: ":memory:", logging: false });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = sequelize.define("User", {
    userName: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: "user" }
}, { timestamps: false });

db.Topic = sequelize.define("Topic", {
    name: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: false });

db.Place = sequelize.define("Place", {
    name: { type: DataTypes.STRING(255), allowNull: false },
    topic_ID: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: { model: db.Topic, key: "id" }
    },
    user_rate: { type: DataTypes.INTEGER, defaultValue: 0 },
    critic_rate: { type: DataTypes.INTEGER, defaultValue: 0 },
    NumberOfRate_L: { type: DataTypes.INTEGER, defaultValue: 0 },
    NumberOfRate_C: { type: DataTypes.INTEGER, defaultValue: 0 },
    Likes: { type: DataTypes.INTEGER, defaultValue: 0 },
    Picture: { type: DataTypes.BLOB("long"), allowNull: false },
    tags: { type: DataTypes.JSON, allowNull: true, defaultValue: [] },
    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    visits: { type: DataTypes.INTEGER, defaultValue: 0 },
    text: { type: DataTypes.STRING(255), allowNull: false }
}, { timestamps: true });

db.Comment = sequelize.define("Comment", {
    user_ID: { type: DataTypes.INTEGER, allowNull: false },
    place_ID: { type: DataTypes.INTEGER, allowNull: false },
    text: { type: DataTypes.STRING(255) },
    likes: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { timestamps: true });

db.Topic.hasMany(db.Place, { foreignKey: "topic_ID" });
db.Place.belongsTo(db.Topic, { foreignKey: "topic_ID" });

db.Place.hasMany(db.Comment, { foreignKey: "place_ID" });
db.Comment.belongsTo(db.Place, { foreignKey: "place_ID" });

db.Rating = sequelize.define("Rating", {
    user_ID: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: { model: db.User, key: "id" }
    },
    place_ID: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: { model: db.Place, key: "id" }
    },
    rating: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    }
}, { timestamps: false });

db.User.hasMany(db.Rating, { foreignKey: "user_ID" });
db.Place.hasMany(db.Rating, { foreignKey: "place_ID" });
db.Rating.belongsTo(db.User, { foreignKey: "user_ID" });
db.Rating.belongsTo(db.Place, { foreignKey: "place_ID" });

async function initializeMockData() {
    await db.sequelize.sync({ force: true });
    const defaultTopic = await db.Topic.create({ name: "Default Test Topic" });
    return defaultTopic;
}

db.initializeMockData = initializeMockData;

module.exports = db;
