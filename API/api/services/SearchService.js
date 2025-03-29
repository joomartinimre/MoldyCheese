// 📁 PlaceSearchService.js
const db = require("../database/dbContext");
const { Op } = require("sequelize");
const Place = db.Place;

// Kategória ID -> név leképezés (topicMap)
const topicMap = {
  1: "Iskola",
  2: "Étterem",
  3: "Bolt",
  4: "Játszótér"
};

const searchPlacesByName = async (searchTerm) => {
  const places = await Place.findAll({
    where: {
      name: {
        [Op.like]: `%${searchTerm}%`
      }
    },
    limit: 5
  });

  return places.map(place => ({
    id: place.ID,
    name: place.name,
    picture: place.Picture ? `http://localhost:3000/api/main/image/${place.ID}` : null,
    category: topicMap[place.topic_ID] || "Ismeretlen"
  }));
};

module.exports = {
  searchPlacesByName
};
