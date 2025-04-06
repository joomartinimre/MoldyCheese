const { searchPlacesByName } = require("../services/SearchService");

exports.get_term = async (req, res) => {
  try {
    const results = await searchPlacesByName(req.params.term);
    res.json(results);
  } catch (error) {
    console.error("❌ Hiba keresés közben:", error);
    res.status(500).json({ error: "Hiba történt a keresés során." });
  }
};
