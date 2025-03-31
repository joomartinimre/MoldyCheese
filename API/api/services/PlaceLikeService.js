const PlaceLikeRepository = require("../repositories/PlaceLikeRepository");
const db = require("../database/dbContext");

class PlaceLikeService {
    async toggleLike(user_ID, place_ID) {
        const existing = await PlaceLikeRepository.find(user_ID, place_ID);
        if (existing) {
            await PlaceLikeRepository.remove(user_ID, place_ID);
            await db.Place.decrement("Likes", { by: 1, where: { ID: place_ID } });
            return { message: "Like removed" };
        } else {
            await PlaceLikeRepository.add(user_ID, place_ID);
            await db.Place.increment("Likes", { by: 1, where: { ID: place_ID } });
            return { message: "Like added" };
        }
    }

    async getUserLike(user_ID, place_ID) {
        return await PlaceLikeRepository.find(user_ID, place_ID);
    }
}

module.exports = new PlaceLikeService();
