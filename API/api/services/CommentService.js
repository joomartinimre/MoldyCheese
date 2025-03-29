const { Op } = require("sequelize");
const db = require("../database/dbContext"); // ✅ Betöltjük a DB kapcsolatot
const Place = db.Place;
const User = db.User;
const RatingRepository = require("../repositories/RatingRepository");

class RatingService {
  async setRating(user_ID, place_ID, ratingValue) {
    console.log("USER ROLE:", user.role);
    console.log("PLACE TOPIC:", place.topic_ID);
    console.log("IS CRITIC?", isCritic);
    console.log("EXISTING RATING?", existingRating);
    console.log("RATING VALUE:", ratingValue);
    const roleToTopicMap = {
      "Étterem kritikus": 2,
      "Játszótér szakértő": 4,
      "Iskológus": 1,
      "Vegyesbolt vegyész": 3
    };

    const user = await User.findByPk(user_ID);
    const place = await Place.findByPk(place_ID);

    if (!user || !place) {
      throw new Error("User vagy Place nem található");
    }

    const isCritic = roleToTopicMap[user.role] === place.topic_ID;
    const existingRating = await RatingRepository.findRating(user_ID, place_ID);

    // ⭐️ TÖRLÉS
    if (ratingValue === 0) {
      if (existingRating) {
        const oldVal = existingRating.rating;

        if (isCritic) {
          place.critic_rate = (place.critic_rate || 0) - oldVal;
          place.NumberOfRate_C = Math.max((place.NumberOfRate_C || 1) - 1, 0);
        } else {
          place.user_rate = (place.user_rate || 0) - oldVal;
          place.NumberOfRate_L = Math.max((place.NumberOfRate_L || 1) - 1, 0);
        }

        await place.save();
        await RatingRepository.deleteRating(user_ID, place_ID);

        return { message: "Rating sikeresen törölve és a hely frissítve lett" };
      } else {
        return { message: "Nem található értékelés a törléshez" };
      }
    }

    // 🔁 FRISSÍTÉS
    if (existingRating) {
      const oldVal = existingRating.rating;

      if (isCritic) {
        place.critic_rate = (place.critic_rate || 0) - oldVal + ratingValue;
      } else {
        place.user_rate = (place.user_rate || 0) - oldVal + ratingValue;
      }

      console.log("FRISSÍTÉS ELŐTT:", place.toJSON());
        await place.save();
        console.log("FRISSÍTÉS UTÁN:", place.toJSON());

      await RatingRepository.updateRating(user_ID, place_ID, ratingValue);

      return { message: "Rating frissítve és a hely is módosítva lett" };
    }

    // ➕ ÚJ LÉTREHOZÁS
    const newRating = await RatingRepository.createRating(user_ID, place_ID, ratingValue);

    if (isCritic) {
      place.critic_rate = (place.critic_rate || 0) + ratingValue;
      place.NumberOfRate_C = (place.NumberOfRate_C || 0) + 1;
    } else {
      place.user_rate = (place.user_rate || 0) + ratingValue;
      place.NumberOfRate_L = (place.NumberOfRate_L || 0) + 1;
    }

    await place.save();

    return { message: "Rating létrehozva és a hely frissítve", rating: newRating };
  }
}

module.exports = new RatingService();
