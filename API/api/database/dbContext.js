const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const express = require("express");
const { exec } = require("child_process");
const app = express();

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
    console.log("✅ Database Connection Successful");
} catch (error) {
    console.error("❌ Database Connection Error:", error.message);
}

const db = {};

const models = require("../models")(sequelize, DataTypes);
Object.assign(db, models);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const seedDataPath = path.join(__dirname, "../backup/seedData.json");

const dirPath = path.join(__dirname, "../backup");
if (!fs.existsSync(dirPath)) {
    console.log("📁 Backup directory does not exist. Creating...");
    fs.mkdirSync(dirPath, { recursive: true });
}

const saveDataOnExit = async () => {
    console.log("💾 Saving database state before exit...");
  
    try {
      const seedOrder = [
        "User",
        "Topic",
        "Place",
        "Comment",
        "Rating",
        "RoleRequest",
        "PlaceLike",
        "CommentLike"
      ];
  
      let seedData = {};
  
      for (const modelName of seedOrder) {
        if (!db[modelName] || !db[modelName].findAll) {
          console.warn(`⚠️ Model ${modelName} not found or findAll not available, skipping.`);
          continue;
        }
  
        console.log(`🔍 Fetching data from ${modelName}...`);
        const records = await db[modelName].findAll({ raw: true });
        if (records.length === 0) {
          console.log(`⚠️ No data found for ${modelName}, skipping.`);
          continue;
        }
  
        let transformedRecords = records;
  
        if (modelName === "Place") {
          transformedRecords = transformedRecords.map(record => ({
            ...record,
            Picture: record.Picture ? Buffer.from(record.Picture).toString("base64") : null,
            tags: Array.isArray(record.tags)
              ? record.tags
              : typeof record.tags === "string"
              ? (() => {
                  try {
                    return JSON.parse(record.tags);
                  } catch {
                    return [];
                  }
                })()
              : []
          }));
        }

        if (modelName === "User") {
            transformedRecords = transformedRecords.map(record => ({
              ...record,
              ProfilePicture: record.ProfilePicture
                ? Buffer.from(record.ProfilePicture).toString("base64")
                : null
            }));
          }
  
        seedData[modelName] = transformedRecords.map(record => formatDates(record, db[modelName]));
      }
  
      console.log("📁 Writing data to backup.json...");
      fs.writeFileSync(
        seedDataPath,
        JSON.stringify(seedData, null, 2),
        "utf-8"
      );
      console.log("✅ Data successfully saved to backup.json");
  
    } catch (error) {
      console.error("❌ Error saving data:", error.message);
      console.error(error.stack);
    }
  };
  
  module.exports = saveDataOnExit;

app.post("/shutdown", async (req, res) => {
    console.log("⚠️ Shutdown request received via API. Saving data before exit...");
    res.json({ message: "Server is shutting down..." });

    try {
        await saveDataOnExit();
        console.log("✅ Data saved. Now closing database connections...");

        await db.sequelize.close();
        console.log("🛑 Database connection closed.");

        if (process.env.NODE_ENV !== "production") {
            console.log("💀 Killing nodemon...");
            exec("taskkill /IM node.exe /F", (err) => {
                if (err) {
                    console.error("❌ Error killing nodemon:", err.message);
                } else {
                    console.log("✅ Nodemon killed successfully.");
                }
                process.exit(0);
            });
        } else {
            process.exit(0);
        }

    } catch (error) {
        console.error("❌ Error during shutdown:", error.message);
        process.exit(1);
    }
});

const SHUTDOWN_PORT = 4000;
app.listen(SHUTDOWN_PORT, () => console.log(`🛑 Shutdown API running on http://localhost:${SHUTDOWN_PORT}/shutdown`));

const seedDatabase = async () => {
    console.log("📥 Seeding database from backup...");
  
    if (!fs.existsSync(seedDataPath)) {
      console.log("⚠️ No seed data found. Skipping seeding.");
      return;
    }
  
    try {
      const seedData = JSON.parse(fs.readFileSync(seedDataPath, "utf-8"));
  
      const seedOrder = [
        "User",
        "Topic",
        "Place",
        "Comment",
        "Rating",
        "RoleRequest",
        "PlaceLike",
        "CommentLike"
      ];
  
      for (const modelName of seedOrder) {
        if (!db[modelName] || !seedData[modelName]) {
          console.warn(`⚠️ Model or data missing: ${modelName}, skipping.`);
          continue;
        }
  
        let records = seedData[modelName];
        if (!Array.isArray(records) || records.length === 0) {
          console.log(`⚠️ No data for ${modelName}, skipping.`);
          continue;
        }
  
        if (modelName === "Place") {
          records = records.map(record => ({
            ...record,
            Picture: record.Picture ? Buffer.from(record.Picture, "base64") : null
          }));
        }
  
        const formatted = records.map(record => formatDates(record, db[modelName]));
  
        console.log(`📥 Seeding ${modelName}...`);
        await db[modelName].bulkCreate(formatted, { ignoreDuplicates: true });
        console.log(`✅ Successfully seeded ${modelName}`);
      }
  
      console.log("✅ Database successfully restored from backup!");
    } catch (error) {
      console.error("❌ Failed to restore seed data:", error.message);
    }
  };    

db.sequelize.sync({ force: true }).then(async () => {
    console.log("✅ Database synchronized");

    await seedDatabase(); 

    const existingComments = await db.Comment.count();
    if (existingComments === 0) {
        console.log("📥 Inserting a test comment manually...");

        const seedData = JSON.parse(fs.readFileSync(seedDataPath, "utf-8"));
        if (seedData.Comment && seedData.Comment.length > 0) {
            await db.Comment.create(seedData.Comment[0]);
            console.log("🔎 Checking after insert (Comment table):", await db.Comment.findAll());
        } else {
            console.log("⚠️ No comments found in seed data.");
        }
    } else {
        console.log("⚠️ Comments already exist, skipping insert.");
    }
});

const formatDates = (record, model) => {
    return Object.keys(record).reduce((obj, key) => {
        if (!model.rawAttributes[key] || model.rawAttributes[key].type.key !== "DATEONLY") {
            obj[key] = record[key];
            return obj;
        }

        if (typeof record[key] === "string") {
            if (record[key] === "0000-00-00" || !record[key].match(/^\d{4}-\d{2}-\d{2}$/)) {
                console.warn(`⚠️ WARNING: Invalid DATEONLY value for "${key}" ->`, record[key]);
                obj[key] = null; 
            } else {
                obj[key] = record[key]; 
            }
        } else if (record[key] instanceof Date) {
            obj[key] = record[key].toISOString().split("T")[0]; 
        } else {
            console.warn(`⚠️ WARNING: Unexpected DATEONLY value for "${key}" ->`, record[key]);
            obj[key] = null; 
        }
        return obj;
    }, {});
};

process.on("exit", async () => {
    console.log("⚠️ Process exit triggered. Ensuring data is saved...");
    await saveDataOnExit();
    console.log("✅ Final data save complete.");
});

module.exports = db;
