const db = require("../database/dbContext");
const Place = db.Place;
const { Op, Sequelize } = require("sequelize");

const topicMap = {
  school: 1,
  restaurant: 2,
  shop: 3,
  playground: 4,
};

const getPlacesByTopic = async (topicSlug, sort = "visits", tagFilter = null) => {
  const topicId = topicMap[topicSlug];
  if (!topicId) throw new Error("Érvénytelen kategória!");

  const orderMap = {
    visits: [["visits", "DESC"]],
    rating: [Sequelize.literal(`
      CASE 
        WHEN (NumberOfRate_L + NumberOfRate_C) = 0 THEN 0 
        ELSE ((user_rate * NumberOfRate_L + critic_rate * NumberOfRate_C) / (NumberOfRate_L + NumberOfRate_C)) 
      END
    `), "DESC"],
    visitsAsc: [["visits", "ASC"]],
    latest: [["createdAt", "DESC"]],
    oldest: [["createdAt", "ASC"]],
    abc: [["name", "ASC"]],
    abcReverse: [["name", "DESC"]],
    mostLiked: [["likes", "DESC"]],
  };

  const order = orderMap[sort] || orderMap.visits;

  const where = { topic_ID: topicId };

if (tagFilter) {
  const tags = Array.isArray(tagFilter) ? tagFilter : [tagFilter];

  const tagConditions = tags.map(tag =>
    Sequelize.where(
      Sequelize.literal(`JSON_CONTAINS(tags, '["${tag}"]')`),
      true
    )
  );

  where[Op.and] = { [Op.or]: tagConditions };
}

  const places = await Place.findAll({
    where,
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
