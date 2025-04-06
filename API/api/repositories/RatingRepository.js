const db = require("../database/dbContext");

class RatingRepository {
  async createRating(user_ID, place_ID, rating,roleWhenRated) {
    return await db.Rating.create({
      user_ID: user_ID,
      place_ID: place_ID,
      rating: rating,
      roleWhenRated: roleWhenRated
    });
  }

  async updateRating(user_ID, place_ID, ratingValue, roleWhenRated) {
    const [affectedRows] = await db.Rating.update(
      { rating: ratingValue, roleWhenRated: roleWhenRated },
      { where: { user_ID: user_ID, place_ID: place_ID } }
    );
    return affectedRows;
  }

  async findRating(user_ID, place_ID) {
    return await db.Rating.findOne({ where: { user_ID: user_ID, place_ID: place_ID } });
  }

  async deleteRating(user_ID, place_ID) {
    return await db.Rating.destroy({ where: { user_ID: user_ID, place_ID: place_ID } });
  }
}

module.exports = new RatingRepository();
