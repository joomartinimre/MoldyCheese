const express = require("express");
const router = express.Router();
const { getPlaceWithComments } = require("../services/PlaceDetailService");

router.get("/:id", async (req, res) => {
  const placeId = req.params.id;

  try {
    const place = await getPlaceWithComments(placeId);
    res.json(place);
  } catch (error) {
    console.error("Hiba a hely betöltésekor:", error.message);
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
