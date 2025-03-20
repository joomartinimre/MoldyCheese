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

// Betöltjük az összes modellt
const models = require("../models")(sequelize, DataTypes);
Object.assign(db, models);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Backup fájl elérési útja
const seedDataPath = path.join(__dirname, "../backup/seedData.json");

// Biztosítsuk, hogy a backup könyvtár létezik
const dirPath = path.join(__dirname, "../backup");
if (!fs.existsSync(dirPath)) {
    console.log("📁 Backup directory does not exist. Creating...");
    fs.mkdirSync(dirPath, { recursive: true });
}

// **Dinamikus mentés minden táblára**
const saveDataOnExit = async () => {
    console.log("💾 Saving database state before exit...");

    try {
        let seedData = {};

        // **Először a User (független)**
        const independentModels = ["User"];
        for (const modelName of independentModels) {
            if (db[modelName] && db[modelName].findAll) {
                console.log(`🔍 Fetching data from ${modelName}...`);
                const records = await db[modelName].findAll({ raw: true });
                if (records.length > 0) {
                    seedData[modelName] = records.map(record => formatDates(record, db[modelName]));
                }
            }
        }

        // **Másodiknak a Topic (független, de User után kell)**
        const topicModel = "Topic";
        if (db[topicModel] && db[topicModel].findAll) {
            console.log(`🔍 Fetching data from ${topicModel}...`);
            const records = await db[topicModel].findAll({ raw: true });
            if (records.length > 0) {
                seedData[topicModel] = records.map(record => formatDates(record, db[topicModel]));
            }
        }

        // **Harmadiknak a Place (Topic után kell)**
        const placeModel = "Place";
        if (db[placeModel] && db[placeModel].findAll) {
            console.log(`🔍 Fetching data from ${placeModel}...`);
            const records = await db[placeModel].findAll({ raw: true });
            if (records.length > 0) {
                seedData[placeModel] = records.map(record => formatDates(record, db[placeModel]));
            }
        }

        // **Végül a FK függő táblák (User & Place után)**
        const dependentModels = ["Comment", "Rating", "RoleRequest"];
        for (const modelName of dependentModels) {
            if (db[modelName] && db[modelName].findAll) {
                console.log(`🔍 Fetching data from ${modelName}...`);
                const records = await db[modelName].findAll({ raw: true });
                if (records.length > 0) {
                    seedData[modelName] = records.map(record => formatDates(record, db[modelName]));
                }
            }
        }

        console.log("📁 Writing data to seedData.json...");
        fs.writeFileSync(
            seedDataPath,
            JSON.stringify(seedData, (key, value) => {
                if (key === "tags" && typeof value === "string") {
                    try {
                        return JSON.parse(value); // Ha JSON string, alakítsuk át tömbbé
                    } catch (e) {
                        return value; // Ha nem JSON, hagyjuk változatlanul
                    }
                }
                if (key === "Picture" && Buffer.isBuffer(value)) {
                    return value.toString("base64"); // ✅ A bináris képadatot base64 formátumba mentjük
                }
                return value;
            }, 2),
            "utf-8"
        );
        console.log("✅ Data successfully saved to seedData.json");

    } catch (error) {
        console.error("❌ Error saving data:", error.message);
        console.error(error.stack);
    }
};

// **Shutdown API – Biztonságos leállítás**
app.post("/shutdown", async (req, res) => {
    console.log("⚠️ Shutdown request received via API. Saving data before exit...");
    res.json({ message: "Server is shutting down..." });

    try {
        await saveDataOnExit();
        console.log("✅ Data saved. Now closing database connections...");

        // **Először zárjuk be a Sequelize kapcsolatot**
        await db.sequelize.close();
        console.log("🛑 Database connection closed.");

        // **Kilőjük a nodemon processzt is**
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

// **Shutdown API szerver indítása**
const SHUTDOWN_PORT = 4000;
app.listen(SHUTDOWN_PORT, () => console.log(`🛑 Shutdown API running on http://localhost:${SHUTDOWN_PORT}/shutdown`));

// **Seeding adatbázis visszatöltés**
const seedDatabase = async () => {
    console.log("📥 Seeding database from backup...");

    if (!fs.existsSync(seedDataPath)) {
        console.log("⚠️ No seed data found. Skipping seeding.");
        return;
    }

    try {
        const seedData = JSON.parse(fs.readFileSync(seedDataPath, "utf-8"));

        // **Először töltsük be a független táblákat**
        const independentModels = ["User", "Topic", "Place"];
        for (const modelName of independentModels) {
            if (!db[modelName]) {
                console.warn(`⚠️ Model ${modelName} not found in DB context.`);
                continue;
            }

            const data = seedData[modelName];

            if (!Array.isArray(data) || data.length === 0) {
                console.log(`⚠️ No data found for ${modelName}, skipping.`);
                continue;
            }

            console.log(`📥 Seeding ${modelName}...`);

            let transformedData = data;

            // 🔹 Ha a `Place` modellről van szó, akkor a `Picture` mezőt visszaalakítjuk bináris formátumba
            if (modelName === "Place") {
                transformedData = data.map(record => ({
                    ...record,
                    Picture: record.Picture ? Buffer.from(record.Picture, "base64") : null // ✅ Base64-ből vissza binárisra
                }));
            }

            await db[modelName].bulkCreate(transformedData, { ignoreDuplicates: true });
            console.log(`✅ Successfully seeded ${modelName} with ${data.length} records.`);
        }

        // **Most jöhetnek a függő modellek**
        const dependentModels = ["Comment", "Rating", "RoleRequest"];
        for (const modelName of dependentModels) {
            if (!db[modelName]) {
                console.warn(`⚠️ Model ${modelName} not found in DB context.`);
                continue;
            }

            const data = seedData[modelName];

            if (!Array.isArray(data) || data.length === 0) {
                console.log(`⚠️ No data found for ${modelName}, skipping.`);
                continue;
            }

            console.log(`📥 Seeding ${modelName}...`);
            await db[modelName].bulkCreate(data, { ignoreDuplicates: true });
            console.log(`✅ Successfully seeded ${modelName} with ${data.length} records.`);
        }

        console.log("✅ Database successfully restored from backup!");
    } catch (error) {
        console.error("❌ Failed to restore seed data:", error.message);
    }
};


// **Adatbázis szinkronizálás és visszatöltés**
db.sequelize.sync({ force: true }).then(async () => {
    console.log("✅ Database synchronized");

    await seedDatabase(); // 🔥 **ELŐSZÖR a független modellek betöltése**


    // **Ellenőrizzük, hogy van-e már comment**
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

// **Fixáljuk a DATEONLY mezőket visszatöltésnél**
const formatDates = (record, model) => {
    return Object.keys(record).reduce((obj, key) => {
        if (!model.rawAttributes[key] || model.rawAttributes[key].type.key !== "DATEONLY") {
            obj[key] = record[key];
            return obj;
        }

        // Ha a mező DATEONLY és string, akkor ellenőrizzük a formátumot
        if (typeof record[key] === "string") {
            if (record[key] === "0000-00-00" || !record[key].match(/^\d{4}-\d{2}-\d{2}$/)) {
                console.warn(`⚠️ WARNING: Invalid DATEONLY value for "${key}" ->`, record[key]);
                obj[key] = null; // Ha rossz a dátum, inkább legyen NULL
            } else {
                obj[key] = record[key]; // Ha már jó, hagyjuk úgy
            }
        } else if (record[key] instanceof Date) {
            obj[key] = record[key].toISOString().split("T")[0]; // YYYY-MM-DD formátumba alakítjuk
        } else {
            console.warn(`⚠️ WARNING: Unexpected DATEONLY value for "${key}" ->`, record[key]);
            obj[key] = null; // Ha nem kezelhető, akkor legyen NULL
        }
        return obj;
    }, {});
};

// **Process exit biztosítása**
process.on("exit", async () => {
    console.log("⚠️ Process exit triggered. Ensuring data is saved...");
    await saveDataOnExit();
    console.log("✅ Final data save complete.");
});

module.exports = db;
