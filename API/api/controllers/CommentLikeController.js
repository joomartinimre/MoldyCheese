
const CommentLikeService = require("../services/CommentLikeService");

const CommentLikeController = {
  async toggleLike(req, res) {
    try {
      const { user_ID, comment_ID } = req.body;
      const result = await CommentLikeService.toggleLike(user_ID, comment_ID);
      res.json(result);
    } catch (error) {
      console.error("toggleLike error:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  },

  async getUserLike(req, res) {
    try {
      const { user_ID, comment_ID } = req.params;
      const exists = await CommentLikeService.getUserLike(user_ID, comment_ID);
      res.json({ exists });
    } catch (error) {
      console.error("getUserLike error:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  },

  async getAllUserCommentLikes(req, res) {
    try {
      const { user_ID } = req.params;
      const likedComments = await CommentLikeService.getAllUserCommentLikes(user_ID);
      res.json(likedComments);
    } catch (error) {
      console.error("getAllUserCommentLikes error:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  }
};

module.exports = CommentLikeController;
