const express = require("express");
const router = express.Router();
const { getPlacesByTopic } = require("../services/PlaceViewService");

router.get("/:topic", async (req, res) => {
  const topicSlug = req.params.topic;
  const sort = req.query.sort || "visits";
  const tag = req.query.tag || null;

  try {
    const places = await getPlacesByTopic(topicSlug, sort, tag);
    res.json(places);
  } catch (error) {
    console.error("❌ Hiba a helyek lekérdezésében:", error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
