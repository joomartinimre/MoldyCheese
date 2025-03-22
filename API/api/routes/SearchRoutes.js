const express = require("express");
const router = express.Router();
const { searchPlacesByName } = require("../services/SearchService");

// GET /api/places/search/:term
router.get("/:term", async (req, res) => {
  try {
    const results = await searchPlacesByName(req.params.term);
    res.json(results);
  } catch (error) {
    console.error("❌ Hiba keresés közben:", error);
    res.status(500).json({ error: "Hiba történt a keresés során." });
  }
});

module.exports = router;