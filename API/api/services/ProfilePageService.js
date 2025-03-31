const db = require("../database/dbContext");

const ProfilePageService = {
  async getUserProfileStats(user_ID) {
    const user = await db.User.findByPk(user_ID, {
      attributes: ["ID", "userName", "role", "email", "ProfilePicture"]
    });

    const hasValidProfilePicture =
    user?.ProfilePicture && Buffer.isBuffer(user.ProfilePicture) && user.ProfilePicture.length > 100;


    const commentCount = await db.Comment.count({
      where: { user_ID }
    });

    const ratingCount = await db.Rating.count({
      where: { user_ID }
    });

    const totalCommentLikes = await db.CommentLike.count({
      include: [{
        model: db.Comment,
        where: { user_ID }
      }]
    });

    const topComments = await db.Comment.findAll({
        where: { user_ID },
        include: [
          {
            model: db.CommentLike,
            attributes: [],
            required: false 
          },
          {
            model: db.User,
            attributes: ["ID", "userName", "role"],
          }
        ],
        attributes: [
          "ID", "text", "createdAt",
          [db.Sequelize.fn("COUNT", db.Sequelize.col("CommentLikes.comment_ID")), "likeCount"]
        ],
        group: ["Comments.ID", "User.ID"],
        order: [[db.Sequelize.literal("likeCount"), "DESC"]],
        limit: 3,
        subQuery: false 
      });

      return {
        userName: user?.userName || "Ismeretlen",
        role: user?.role || "Ismeretlen",
        email: user?.email || "Ismeretlen",
        profilePictureUrl: hasValidProfilePicture
        ? `http://localhost:3000/api/user/image/${user.ID}`
        : `http://localhost:3000/api/user/image/defaultPP.jpg`,
        commentCount: commentCount || 0,
        ratingCount: ratingCount || 0,
        totalCommentLikes: totalCommentLikes || 0,
        topComments: topComments || []
      };
  },

  async updateProfilePicture(user_ID, pictureBuffer) {
    const user = await db.User.findByPk(user_ID);
    if (!user) throw new Error("Felhasználó nem található.");

    user.ProfilePicture = pictureBuffer;
    await user.save();
    return { message: "Profilkép sikeresen frissítve." };
  },

  async updateUserName(user_ID, newUserName) {
    const user = await db.User.findByPk(user_ID);
    if (!user) throw new Error("Felhasználó nem található.");

    user.userName = newUserName;
    await user.save();
    return { message: "Felhasználónév sikeresen módosítva." };
  }
};

module.exports = ProfilePageService;
