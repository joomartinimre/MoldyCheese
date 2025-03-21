const db = require("../database/dbContext");
const Place = db.Place;
const { Op, Sequelize } = require("sequelize");

const topicMap = {
  school: 1,
  restaurant: 2,
  shop: 3,
  playground: 4,
};

const getPlacesByTopic = async (topicSlug, sort = "visits") => {
  const topicId = topicMap[topicSlug];
  if (!topicId) throw new Error("Érvénytelen kategória!");

  const orderMap = {
    visits: [["visits", "DESC"]],
    rating: [
      Sequelize.literal(`
        CASE 
          WHEN (NumberOfRate_L + NumberOfRate_C) = 0 THEN 0 
          ELSE ((user_rate * NumberOfRate_L + critic_rate * NumberOfRate_C) / (NumberOfRate_L + NumberOfRate_C)) 
        END
      `), "DESC"
    ],
    latest: [["createdAt", "DESC"]],
  };

  const order = orderMap[sort] || orderMap.visits;

  const places = await Place.findAll({
    where: { topic_ID: topicId },
    order,
    limit: 50,
  });

  return places.map(place => ({
    id: place.ID,
    title: place.name,
    url: place.Picture ? `http://localhost:3000/api/main/image/${place.ID}` : null,
    rating: calculateRating(place)
  }));
};

const calculateRating = (place) => {
  const { user_rate, critic_rate, NumberOfRate_L, NumberOfRate_C } = place;
  const total = NumberOfRate_L + NumberOfRate_C;
  if (total === 0) return 0;
  return Math.round(((user_rate * NumberOfRate_L + critic_rate * NumberOfRate_C) / total) * 2) / 2;
};

module.exports = { getPlacesByTopic };
