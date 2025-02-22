const db = require("../database/dbContext");

class CommentRepository {
    async createComment(user_ID, place_ID, text, rate) {
        return await db.Comment.create({
            user_ID,
            place_ID,
            text,
            rate,
            likes: 0, 
            createdAt: new Date() 
        });
    }

    async findCommentsByPlace(place_ID) {
        return await db.Comment.findAll({ where: { place_ID } });
    }

    async findCommentByID(commentID) {
        return await db.Comment.findOne({ where: { ID: commentID } });
    }

    async deleteComment(commentID) {
        return await db.Comment.destroy({ where: { ID: commentID } });
    }
}

module.exports = new CommentRepository();