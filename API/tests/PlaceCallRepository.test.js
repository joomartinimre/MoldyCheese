jest.mock("../api/database/dbContext", () => require("../__mocks__/db"));
require("dotenv").config();

const placeRepository = require("../api/repositories/PlaceRepository");
let testTopic;

describe("Place Repository Tests", () => {
    beforeAll(async () => {
        const db = require("../__mocks__/db");
        await db.sequelize.sync({ force: true });

        testTopic = await db.initializeMockData();
        expect(testTopic).toBeDefined();
        expect(testTopic.id).toBeDefined();
    });

    describe("Create Place", () => {
        test("Should create a new place successfully", async () => {
            const placeData = {
                name: "Test Place",
                topic_ID: testTopic.id,
                user_rate: 4.5,
                critic_rate: 4.0,
                createdAt: new Date(),
                visits: 12,
                location: "Test City",
                text: "Test description",
                Picture: Buffer.from("mock-image")
            };

            const newPlace = await placeRepository.createPlace(placeData);

            expect(newPlace).toHaveProperty("name", "Test Place");
            expect(newPlace).toHaveProperty("visits", 12);
            expect(newPlace).toHaveProperty("topic_ID", testTopic.id);
        });
    });

    describe("Get Place By ID", () => {
        test("Should return the correct place by ID", async () => {
            const placeData = {
                name: "Unique Place",
                topic_ID: testTopic.id,
                user_rate: 3.5,
                critic_rate: 3.0,
                createdAt: new Date(),
                visits: 5,
                location: "Another City",
                text: "Another description",
                Picture: Buffer.from("another-image")
            };

            const createdPlace = await placeRepository.createPlace(placeData);

            const foundPlace = await placeRepository.getPlaceById(createdPlace.id);

            expect(foundPlace).toBeDefined();
            expect(foundPlace.name).toBe("Unique Place");
            expect(foundPlace.id).toBe(createdPlace.id);
        });
    });

    describe("Get All Places", () => {
        test("Should return all places", async () => {
            const allPlaces = await placeRepository.getAllPlaces();

            expect(Array.isArray(allPlaces)).toBe(true);
            expect(allPlaces.length).toBeGreaterThanOrEqual(2); 
        });
    });
});
