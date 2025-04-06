const { getPlaceWithComments } = require("../services/PlaceDetailService");

exports.get_id = async (req, res) => {
  const placeId = req.params.id;
  const user_ID = req.body.user_ID || null;

  try {
    const place = await getPlaceWithComments(placeId, user_ID);
    res.json(place);
  } catch (error) {
    console.error("Hiba a hely betöltésekor:", error.message);
    res.status(404).json({ error: error.message });
  }
};
