const db = require("../database/dbContext");
const Place = db.Place;
const Comment = db.Comment;
const defaultProfilePictureUrl = "http://localhost:3000/api/user/image/defaultPP.jpg";

const calculateTotalRating = (user_rate, critic_rate, NumberOfRate_L, NumberOfRate_C) => {
  if ((NumberOfRate_L + NumberOfRate_C) === 0) return 0; // Ha nincs értékelés
  const totalRating = (user_rate * NumberOfRate_L + critic_rate * NumberOfRate_C) / (NumberOfRate_L + NumberOfRate_C);
  return Math.round(totalRating * 2) / 2; // Kerekítés 0.5-es lépésekben
};

const getPlaceWithComments = async (placeId) => {
  
  const place = await Place.findByPk(placeId, {
    
    include: [
      {
        model: db.Comment,
        as: "Comments",
        include: [
          {
            model: db.User,
            as: "User",
            attributes: ["userName", "role", "ProfilePicture"]
          }
        ]
      }
    ]
  });
  console.log("✅ Betöltött hely:", place.tags);
  if (!place) throw new Error("Nem található a hely.");
  
  return {
    id: place.ID,
    name: place.name,
    description: place.text,
    tags: place.tags,
    url: place.Picture ? `http://localhost:3000/api/main/image/${place.ID}` : null,
    rating: calculateTotalRating(place.user_rate, place.critic_rate, place.NumberOfRate_L, place.NumberOfRate_C),
    Comments: place.Comments
  };
}

module.exports = {
  getPlaceWithComments,
};
