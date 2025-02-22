jest.mock("../api/database/dbContext", () => require("../__mocks__/db"));
require("dotenv").config();

const commentRepository = require("../api/repositories/CommentRepository");
let testPlace, testTopic;

describe("Comment Repository Tests", () => {
    beforeAll(async () => {
        const db = require("../__mocks__/db");
        await db.sequelize.sync({ force: true });

        testTopic = await db.initializeMockData();
        expect(testTopic).toBeDefined();
        expect(testTopic.id).toBeDefined();

        testPlace = await db.Place.create({
            topic_ID: testTopic.id,
            user_rate: 0,
            critic_rate: 0,
            added_date: new Date(),
            visits: 0,
            location: "Test Location",
            text: "Test Place"
        });

        expect(testPlace).toBeDefined();
        expect(testPlace.id).toBeDefined();
    });

    describe("Create Comment", () => {
        test("Should create a new comment successfully", async () => {
            const commentData = {
                user_ID: 1,
                place_ID: testPlace.id,
                text: "This is a test comment",
                rate: 5
            };
            
            const newComment = await commentRepository.createComment(
                commentData.user_ID,
                commentData.place_ID,
                commentData.text,
                commentData.rate
            );
            
            expect(newComment).toHaveProperty("text", "This is a test comment");
            expect(newComment).toHaveProperty("rate", 5);
            expect(newComment).toHaveProperty("likes", 0);
            expect(newComment.place_ID).toBe(testPlace.id);
        });
    });

    describe("Retrieve Comments", () => {
        test("Should retrieve comments by place_ID", async () => {
            expect(testPlace.id).toBeDefined();
            const comments = await commentRepository.findCommentsByPlace(testPlace.id);
            expect(Array.isArray(comments)).toBe(true);
            expect(comments.length).toBeGreaterThan(0);
        });
    });

    describe("Delete Comment", () => {
        test("Should delete a comment successfully", async () => {
            expect(testPlace.id).toBeDefined();
            const commentToDelete = await commentRepository.createComment(1, testPlace.id, "Comment to delete", 4);
            
            expect(commentToDelete).toHaveProperty("id");
            
            await expect(commentRepository.deleteComment(commentToDelete.id)).resolves.toBe(1);
        });
    });
});
