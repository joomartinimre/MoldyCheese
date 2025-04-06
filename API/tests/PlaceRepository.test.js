jest.mock("../api/database/dbContext", () => require("../__mocks__/db"));
require("dotenv").config();

const db = require("../__mocks__/db");  
const placeRepository = require("../api/repositories/PlaceRepository");

let testTopic;

describe("Place Repository Tests", () => {
    beforeAll(async () => {
        await db.sequelize.sync({ force: true });

        testTopic = await db.initializeMockData();
        expect(testTopic).toBeDefined();
        expect(testTopic.id).toBeDefined();
    });

    describe("Create Place", () => {
        test("Should create a new place successfully", async () => {
            const placeData = {
                name: "Test Place",
                text: "This is a test place description",
                tags: ["test", "place"],
                topic_ID: testTopic.id,
                Picture: Buffer.from("test-image"),
            };

            expect(db.Place).toBeDefined();

            const newPlace = await db.Place.create(placeData);

            expect(newPlace).toHaveProperty("name", "Test Place");
            expect(newPlace).toHaveProperty("text", "This is a test place description");
            expect(newPlace.topic_ID).toBe(testTopic.id);
            expect(newPlace.Picture).toBeInstanceOf(Buffer);
        });

        test("Should fail when required fields are missing", async () => {
            const placeData = {
                text: "This is a test place description",
                tags: ["test", "place"],
                topic_ID: testTopic.id
            };

            await expect(db.Place.create(placeData)).rejects.toThrow();
        });
    });
});
