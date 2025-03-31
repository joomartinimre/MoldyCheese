const PlaceLikeService = require("../services/PlaceLikeService");

class PlaceLikeController {
    static async toggleLike(req, res) {
        const { user_ID, place_ID } = req.body;
        try {
            const result = await PlaceLikeService.toggleLike(user_ID, place_ID);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    static async getUserLike(req, res) {
        const { user_ID, place_ID } = req.params;
        try {
            const like = await PlaceLikeService.getUserLike(user_ID, place_ID);
            res.status(200).json({ liked: !!like });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}

module.exports = PlaceLikeController;
