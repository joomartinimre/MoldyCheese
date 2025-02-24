const CommentRepository = require("../repositories/CommentRepository");

class CommentService {
    async addComment(user_ID, place_ID, text) {
        if (!text || !rate || !place_ID) {
            throw new Error("All fields (place_ID, text) are required");
        }
        return await CommentRepository.createComment(user_ID, place_ID, text);
    }

    async getCommentsByPlace(place_ID) {
        return await CommentRepository.findCommentsByPlace(place_ID);
    }

    async deleteComment(user_ID, commentID, userRole) {
        const comment = await CommentRepository.findCommentByID(commentID);
        if (!comment) {
            throw new Error("Comment not found");
        }
        
        if (comment.user_ID !== user_ID && userRole !== "admin") {
            throw new Error("Unauthorized to delete this comment");
        }
        
        await CommentRepository.deleteComment(commentID);
    }
}

module.exports = new CommentService();
