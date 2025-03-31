jest.mock("../api/database/dbContext", () => require("../__mocks__/db"));
require("dotenv").config();

const ratingRepository = require("../api/repositories/RatingRepository");
let testPlace, testUser;

describe("Rating Repository Tests", () => {
    beforeAll(async () => {
        const db = require("../__mocks__/db");
        await db.sequelize.sync({ force: true });

        const testTopic = await db.initializeMockData();
        expect(testTopic).toBeDefined();
        expect(testTopic.id).toBeDefined();

        testPlace = await db.Place.create({
            name: "Test Place",
            topic_ID: testTopic.id,
            user_rate: 0,
            critic_rate: 0,
            createdAt: new Date(),
            visits: 0,
            location: "Test Location",
            text: "Test Place",
            Picture: Buffer.from("test-image")
        });
        
        testUser = await db.User.create({
            userName: "TestUser",
            password: "hashedpassword",
            email: "testuser@example.com",
            role: "user"
        });
        
        expect(testPlace).toBeDefined();
        expect(testUser).toBeDefined();
    });

    describe("Update Rating", () => {
        test("Should update an existing rating", async () => {
            
            await ratingRepository.deleteRating(testUser.id, testPlace.id);
            
            
            await ratingRepository.createRating(testUser.id, testPlace.id, 3);
            
            
            const updatedRows = await ratingRepository.updateRating(testUser.id, testPlace.id, 4);
            expect(updatedRows).toBe(1); 
    
            
            const updatedRating = await ratingRepository.findRating(testUser.id, testPlace.id);
            expect(updatedRating.rating).toBe(4);
        });
    });
    
    describe("Delete Rating", () => {
        test("Should delete a rating successfully", async () => {
            
            await ratingRepository.deleteRating(testUser.id, testPlace.id);
    
            
            await ratingRepository.createRating(testUser.id, testPlace.id, 2);
            
            
            const deletedRows = await ratingRepository.deleteRating(testUser.id, testPlace.id);
            expect(deletedRows).toBe(1); 
    
            
            const deletedRating = await ratingRepository.findRating(testUser.id, testPlace.id);
            expect(deletedRating).toBeNull();
        });
    });
    
});
