const db = require("../database/dbContext");

class PlaceLikeRepository {
    async add(user_ID, place_ID) {
        return await db.PlaceLike.create({ user_ID, place_ID });
    }

    async remove(user_ID, place_ID) {
        return await db.PlaceLike.destroy({ where: { user_ID, place_ID } });
    }

    async find(user_ID, place_ID) {
        return await db.PlaceLike.findOne({ where: { user_ID, place_ID } });
    }
}

module.exports = new PlaceLikeRepository();
