const db = require("../database/dbContext");

class CommentRepository {
    async createComment(user_ID, place_ID, text) {
        return await db.Comment.create({
            user_ID,
            place_ID,
            text,
            likes: 0, 
            createdAt: new Date() 
        });
    }

    async updateCommentText(commentID, newText) {
        const comment = await db.Comment.findOne({ where: { ID: commentID } });
        if (!comment) return null;

        comment.text = newText;
        await comment.save();

        return comment;
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