const { getPopularPlaces, getRecentPlaces, getLatestPlaces, getTopRatedPlaces } = require("../services/MainPageService");
const db = require("../database/dbContext");

exports.get_image_id = async (req, res) => {
    try {
        console.log("🔍 Kép lekérdezése ID:", req.params.id);
        const place = await db.Place.findByPk(req.params.id);

        if (!place) {
            console.log("❌ Hely nem található az adatbázisban.");
            return res.status(404).json({ error: "Hely nem található." });
        }

        if (!place.Picture || place.Picture.length === 0) {
            console.log("❌ Kép nem található az adatbázisban.");
            return res.status(404).json({ error: "Kép nem található." });
        }

        console.log("📸 Kép megtalálva, küldés...");
        console.log("📏 Kép mérete (bájtban):", place.Picture.length);

        res.setHeader("Content-Type", "image/jpeg");
        res.setHeader("Content-Length", place.Picture.length);
        res.status(200).end(place.Picture); 
    } catch (error) {
        console.error("❌ Hiba a kép lekérésekor:", error);
        res.status(500).json({ error: "Hiba történt a kép lekérése közben." });
    }
};

exports.get_popular = async (req, res) => {
    try {
        const places = await getPopularPlaces();
        res.json(places);
    } catch (error) {
        console.error("Hiba a /popular végpontnál:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.post_recent = async (req, res) => {
    try {
        const userVisitedPlaceIds = req.body.placeIds || [];
        if (userVisitedPlaceIds.length === 0) {
            console.log("jancsi")
            return res.json([]);
        }
        const places = await getRecentPlaces(userVisitedPlaceIds);
        res.json(places);
    } catch (error) {
        console.error("Hiba a /recent végpontnál:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.get_latest = async (req, res) => {
    try {
        const places = await getLatestPlaces();
        res.json(places);
    } catch (error) {
        console.error("Hiba a /latest végpontnál:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.get_top_rated = async (req, res) => {
    try {
        const places = await getTopRatedPlaces();
        res.json(places);
    } catch (error) {
        console.error("Hiba a /top-rated végpontnál:", error);
        res.status(500).json({ error: error.message });
    }
};
