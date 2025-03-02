const RatingRepository = require("../repositories/RatingRepository");

class RatingService {
  async setRating(user_ID, place_ID, ratingValue) {
    // Ha a rating értéke 0, akkor töröljük az értékelést
    if (ratingValue === 0) {
      await RatingRepository.deleteRating(user_ID, place_ID);
      return { message: "Rating deleted successfully" };
    }
    
    // Ellenőrizzük, hogy van-e már értékelés az adott user–place kombinációra
    const existingRating = await RatingRepository.findRating(user_ID, place_ID);
    if (existingRating) {
      await RatingRepository.updateRating(user_ID, place_ID, ratingValue);
      return { message: "Rating updated successfully" };
    } else {
      const newRating = await RatingRepository.createRating(user_ID, place_ID, ratingValue);
      return { message: "Rating created successfully", rating: newRating };
    }
  }
}

module.exports = new RatingService();
