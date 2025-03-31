
const db = require("../database/dbContext");

const CommentLikeRepository = {
  async addLike(user_ID, comment_ID) {
    await db.CommentLike.create({ user_ID, comment_ID });
    await db.Comment.increment("likes", { where: { ID: comment_ID } });
  },

  async removeLike(user_ID, comment_ID) {
    await db.CommentLike.destroy({
      where: { user_ID, comment_ID }
    });
    await db.Comment.decrement("likes", { where: { ID: comment_ID } });
  },

  async getUserLike(user_ID, comment_ID) {
    const like = await db.CommentLike.findOne({
      where: { user_ID, comment_ID }
    });
    return !!like;
  },

  async getAllUserCommentLikes(user_ID) {
    return await db.CommentLike.findAll({
      where: { user_ID },
      attributes: ["comment_ID"]
    });
  }
};

module.exports = CommentLikeRepository;
