const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: false,
    }
);

try {
    sequelize.authenticate();
    console.log("Database Connection Successful");
} catch (error) {
    console.log("Database Connection Error:", error.message);
}

const db = {};

// Itt importáljuk az összes modellt, beleértve az új Rating modellt is
const { Comment, User, Topic, Place, Rating } = require("../models")(sequelize, DataTypes);

db.Comment = Comment;
db.User = User;
db.Topic = Topic;
db.Place = Place;
db.Rating = Rating;

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Define the seed data path
const seedDataPath = path.join(__dirname, "../backup/seedData.json");

// Ensure the backup directory exists
const dirPath = path.join(__dirname, "../backup");
if (!fs.existsSync(dirPath)) {
    console.log("Backup directory does not exist. Creating...");
    fs.mkdirSync(dirPath, { recursive: true });
}

// Save data on server shutdown
const saveDataOnExit = async () => {
    console.log("Saving data before exit...");

    try {
        const users = await db.User.findAll({ raw: true });
        console.log("Users found:", users);

        const places = await db.Place.findAll({ raw: true });
        const topics = await db.Topic.findAll({ raw: true });
        const comments = await db.Comment.findAll({ raw: true });
        const ratings = await db.Rating.findAll({ raw: true });

        const seedData = {
            users: users || [],
            places: places || [],
            topics: topics || [],
            comments: comments || [],
            ratings: ratings || []
        };

        console.log("Seed data prepared for saving:", JSON.stringify(seedData, null, 2));

        fs.writeFileSync(seedDataPath, JSON.stringify(seedData, null, 2), "utf-8");
        console.log("Data saved to seedData.json");
    } catch (error) {
        console.error("Error saving data:", error.message);
    }
};

// Graceful shutdown
const gracefulShutdown = async (signal) => {
    console.log(`${signal} signal received: saving data and exiting...`);
    try {
        await saveDataOnExit();
        console.log("Shutdown complete.");
        setTimeout(() => process.exit(0), 500);
    } catch (error) {
        console.error("Error during shutdown:", error.message);
        process.exit(1);
    }
};

// Handle termination signals
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

// Sync database and seed data if empty
db.sequelize.sync({ alter: true }).then(async () => {
    console.log("Database synchronized");

    if (fs.existsSync(seedDataPath)) {
        try {
            const seedData = JSON.parse(fs.readFileSync(seedDataPath, "utf-8"));

            const userCount = await db.User.count();
            if (userCount === 0 && Array.isArray(seedData.users)) {
                console.log("Seeding users...");
                await db.User.bulkCreate(seedData.users);
            }

            // Seeding a Rating tábla, ha üres
            const ratingCount = await db.Rating.count();
            if (ratingCount === 0 && Array.isArray(seedData.ratings)) {
                console.log("Seeding ratings...");
                await db.Rating.bulkCreate(seedData.ratings);
            }

        } catch (error) {
            console.error("Failed to parse seed data:", error.message);
        }
    } else {
        console.log("No seed data found. Skipping seeding.");
    }
});

module.exports = db;
