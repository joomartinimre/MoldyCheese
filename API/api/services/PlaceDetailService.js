const db = require("../database/dbContext");
const Place = db.Place;
const Comment = db.Comment;
const defaultProfilePictureUrl = "http://localhost:3000/api/user/image/defaultPP.jpg";

const calculateTotalRating = (user_rate, critic_rate, NumberOfRate_L, NumberOfRate_C) => {
  if ((NumberOfRate_L + NumberOfRate_C) === 0) return 0;
  const totalRating = (user_rate  + critic_rate) / (NumberOfRate_L + NumberOfRate_C);
  return Math.round(totalRating * 2) / 2; 
};

const getPlaceWithComments = async (placeId , user_ID) => {
  
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
      },
      {
        model: db.Rating,
        as: "Ratings"
      }
    ]
  });


  console.log("✅ Betöltött hely:", place.tags);
  if (!place) throw new Error("Nem található a hely.");
  
  await place.increment("visits", { by: 1 });
  const userRating = place.Ratings.find(r => r.user_ID === user_ID)?.rating ?? null;

  console.log("a user rating: " + userRating)
  console.log("a user ID: " + user_ID)

  return {
    id: place.ID,
    name: place.name,
    description: place.text,
    tags: place.tags,
    url: place.Picture ? `http://localhost:3000/api/main/image/${place.ID}` : null,
    rating: calculateTotalRating(place.user_rate, place.critic_rate, place.NumberOfRate_L, place.NumberOfRate_C),
    user_rate: place.NumberOfRate_L > 0 ? place.user_rate / place.NumberOfRate_L : 0,
    user_ratenumberL : place.NumberOfRate_L,
    user_ratenumberC : place.NumberOfRate_C,
    topic_id: place.topic_ID,
    critic_rate: place.NumberOfRate_C > 0 ? place.critic_rate / place.NumberOfRate_C : 0,
    createdAt: place.createdAt.toISOString().split('T')[0],
    visits: place.visits,
    likes: place.Likes,
    userrating: userRating,
    Comments: place.Comments
  };
}

module.exports = {
  getPlaceWithComments,
};
