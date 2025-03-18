const placeRepository = require("../repositories/PlaceRepository");

class PlaceService {
    async createPlace({ name, text, tags, topic_ID, picture }) {
        const newPlace = {
            name,
            text,
            tags,
            topic_ID,
            Picture: picture, 
            user_rate: 0,
            critic_rate: 0,
            NumberOfRate_L: 0,
            NumberOfRate_C: 0,
            visits: 0,
            Likes: 0,

            createdAt: new Date(),
            updatedAt: new Date()
        };
        return await placeRepository.createPlace(newPlace);
    }
}

module.exports = new PlaceService();
