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

        expect(testPlace).toBeDefined();
        expect(testPlace.id).toBeDefined();
    });

    describe("Create Comment", () => {
        test("Should create a new comment successfully", async () => {
            const commentData = {
                user_ID: 1,
                place_ID: testPlace.id,
                text: "This is a test comment",
            };
            
            const newComment = await commentRepository.createComment(
                commentData.user_ID,
                commentData.place_ID,
                commentData.text
            );
            
            expect(newComment).toHaveProperty("text", "This is a test comment");
            expect(newComment).toHaveProperty("likes", 0);
            expect(newComment.place_ID).toBe(testPlace.id);
        });
    });

    describe("Find Comment By ID", () => {
        test("Should return the correct comment by ID", async () => {
            const createdComment = await commentRepository.createComment(
                1,
                testPlace.id,
                "Find this comment"
            );

            const foundComment = await commentRepository.findCommentByID(createdComment.id);

            expect(foundComment).toBeDefined();
            expect(foundComment.text).toBe("Find this comment");
            expect(foundComment.id).toBe(createdComment.id);
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

    describe("Update Comment Text", () => {
        test("Should update the comment text successfully", async () => {
            const originalComment = await commentRepository.createComment(
                1,
                testPlace.id,
                "Original text"
            );
    
            const updated = await commentRepository.updateCommentText(originalComment.id, "Updated text");
    
            expect(updated).toBeDefined();
            expect(updated.text).toBe("Updated text");
            expect(updated.id).toBe(originalComment.id);
        });
    
        test("Should return null if the comment does not exist", async () => {
            const result = await commentRepository.updateCommentText(99999, "Won't work");
            expect(result).toBeNull();
        });
    });
});