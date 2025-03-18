const db = require("../database/dbContext");

class PlaceRepository {
    async createPlace(data) {
        return await db.Place.create(data);
    }

    async getPlaceById(id) {
        return await db.Place.findByPk(id);
    }

    async getAllPlaces() {
        return await db.Place.findAll();
    }
}

module.exports = new PlaceRepository();
