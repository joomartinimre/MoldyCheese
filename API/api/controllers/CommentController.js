const CommentService = require("../services/CommentService");

class CommentController {
    static async addComment(req, res) {
        try {
          const { place_ID, text, user_ID: userIDFromBody } = req.body;
          const user_ID = req.user ? req.user.id : userIDFromBody;
          if (!user_ID) {
            throw new Error("User not authenticated");
          }
          const newComment = await CommentService.addComment(user_ID, place_ID, text);
          res.status(201).json({ message: "Comment added successfully", comment: newComment });
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      }

    static async getCommentsByPlace(req, res) {
        try {
            const { place_ID } = req.params;
            const comments = await CommentService.getCommentsByPlace(place_ID);
            res.status(200).json(comments);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deleteComment(req, res) {
        try {
            const { id } = req.params;
            const user_ID = req.user.id;
            const userRole = req.user.role;
            await CommentService.deleteComment(user_ID, id, userRole);
            res.status(200).json({ message: "Comment deleted successfully" });
        } catch (error) {
            res.status(403).json({ error: error.message });
        }
    }
}

module.exports = CommentController;