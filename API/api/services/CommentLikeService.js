
const CommentLikeRepository = require("../repositories/CommentLikeRepository");

const CommentLikeService = {
  async toggleLike(user_ID, comment_ID) {
    const exists = await CommentLikeRepository.getUserLike(user_ID, comment_ID);
    if (exists) {
      await CommentLikeRepository.removeLike(user_ID, comment_ID);
      return { message: "Like removed." };
    } else {
      await CommentLikeRepository.addLike(user_ID, comment_ID);
      return { message: "Like added." };
    }
  },

  async getUserLike(user_ID, comment_ID) {
    return await CommentLikeRepository.getUserLike(user_ID, comment_ID);
  },

  async getAllUserCommentLikes(user_ID) {
    return await CommentLikeRepository.getAllUserCommentLikes(user_ID);
  }
};

module.exports = CommentLikeService;
