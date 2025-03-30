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
          console.log("USER:", req.body);
            const { id } = req.params;
            const {user_ID, role: userRole } = req.body;
            await CommentService.deleteComment(user_ID, id, userRole);
            res.status(200).json({ message: "Comment deleted successfully" });
        } catch (error) {
            res.status(403).json({ error: error.message });
        }
    }

    static async updateComment (req, res) {
      const { id } = req.params;
      const { text } = req.body;

      try {
        const updatedComment = await CommentService.updateCommentText(id, text);
        if (!updatedComment) {
          return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json(updatedComment);
      } catch (error) {
        console.error('Error updating comment:', error);
        res.status(500).json({ message: 'Failed to update comment' });
  }
    };
}

module.exports = CommentController;