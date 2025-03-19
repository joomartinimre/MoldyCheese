const RatingService = require("../services/RatingService");

class RatingController {
  async setRating(req, res) {
    try {
      const { place_ID, rating } = req.body;
      
      const user_ID = req.user ? req.user.id : req.body.user_ID;
      if (!place_ID || rating === undefined) {
        return res.status(400).json({ error: "All fields (place_ID, rating) are required" });
      }
      const result = await RatingService.setRating(user_ID, place_ID, rating);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new RatingController();
