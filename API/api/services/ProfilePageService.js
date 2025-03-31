const db = require("../database/dbContext");

const ProfilePageService = {
  // 1. Felhasználói adatok és statisztikák lekérése
  async getUserProfileStats(user_ID) {
    const user = await db.User.findByPk(user_ID, {
      attributes: ["userName", "role"]
    });

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
      include: [{
        model: db.CommentLike,
        attributes: []
      }],
      attributes: [
        "ID", "text", "createdAt",
        [db.Sequelize.fn("COUNT", db.Sequelize.col("CommentLikes.comment_ID")), "likeCount"]
      ],
      group: ["Comment.ID"],
      order: [[db.Sequelize.literal("likeCount"), "DESC"]],
      limit: 3
    });

    return {
      userName: user?.userName || "Ismeretlen",
      role: user?.role || "Ismeretlen",
      commentCount,
      ratingCount,
      totalCommentLikes,
      topComments
    };
  },

  // 2. Profilkép módosítása
  async updateProfilePicture(user_ID, pictureBuffer) {
    const user = await db.User.findByPk(user_ID);
    if (!user) throw new Error("Felhasználó nem található.");

    user.ProfilePicture = pictureBuffer;
    await user.save();
    return { message: "Profilkép sikeresen frissítve." };
  },

  // 3. Felhasználónév módosítása
  async updateUserName(user_ID, newUserName) {
    const user = await db.User.findByPk(user_ID);
    if (!user) throw new Error("Felhasználó nem található.");

    user.userName = newUserName;
    await user.save();
    return { message: "Felhasználónév sikeresen módosítva." };
  }
};

module.exports = ProfilePageService;
