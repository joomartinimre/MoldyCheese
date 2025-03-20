const { Op, Sequelize } = require("sequelize");
const db = require("../database/dbContext"); // ✅ Az adatbáziskapcsolat betöltése
const Place = db.Place; 

// Segédfüggvény az összesített értékelés kiszámításához
const calculateTotalRating = (user_rate, critic_rate, NumberOfRate_L, NumberOfRate_C) => {
    if ((NumberOfRate_L + NumberOfRate_C) === 0) return 0; // Ha nincs értékelés
    const totalRating = (user_rate * NumberOfRate_L + critic_rate * NumberOfRate_C) / (NumberOfRate_L + NumberOfRate_C);
    return Math.round(totalRating * 2) / 2; // Kerekítés 0.5-es lépésekben
};

// Kép Base64 formátumra alakítása


// 7 leglátogatottabb hely
const getPopularPlaces = async () => {
    const places = await Place.findAll({ 
        order: [["visits", "DESC"]], 
        limit: 7,
        raw: true // ✅ Biztosítja, hogy tiszta adatokat kapjunk
    });

    console.log("📌 Lekérdezett helyek:", places.length, "db hely");

    return places.map(place => {
        console.log("🎯 Feldolgozás alatt:", place.ID, place.name);

        return places.map(place => formatPlace(place));
    });
};

// 20 legutóbbi megtekintett hely (felhasználónak)
const getRecentPlaces = async (userVisitedPlaceIds) => {
    if (!userVisitedPlaceIds || userVisitedPlaceIds.length === 0) return [];
    const places = await Place.findAll({
        where: { ID: { [Op.in]: userVisitedPlaceIds } },
        order: [["createdAt", "DESC"]],
        limit: 20
    });
    return places.map(place => formatPlace(place));
};

// Legújabb helyek
const getLatestPlaces = async () => {
    const places = await Place.findAll({ order: [["createdAt", "DESC"]], limit: 20 });
    return places.map(place => formatPlace(place));
};

// 10 legjobban értékelt hely
const getTopRatedPlaces = async () => {
    try {
        const places = await Place.findAll({
            attributes: [
                "ID", "name", "Picture", "user_rate", "critic_rate", "NumberOfRate_L", "NumberOfRate_C", "text",
                [
                    Sequelize.literal(`
                        (CASE 
                            WHEN (NumberOfRate_L + NumberOfRate_C) = 0 THEN 0 
                            ELSE ((user_rate * NumberOfRate_L + critic_rate * NumberOfRate_C) / (NumberOfRate_L + NumberOfRate_C)) 
                        END)
                    `),
                    "totalRating"
                ]
            ],
            order: [[Sequelize.literal("totalRating"), "DESC"]],
            limit: 10
        });
        return places.map(place => formatPlace(place));
    } catch (error) {
        console.error("Hiba a getTopRatedPlaces függvényben:", error);
        throw new Error("Lekérdezési hiba: " + error.message);
    }
};

// Formázza az adatokat a frontend számára
const formatPlace = (place) => ({
    id: place.ID,
    url: place.Picture ? `http://localhost:3000/api/main/image/${place.ID}` : null,
    title: place.name,
    rating: calculateTotalRating(place.user_rate, place.critic_rate, place.NumberOfRate_L, place.NumberOfRate_C),
    description: place.text
});

module.exports = { getPopularPlaces, getRecentPlaces, getLatestPlaces, getTopRatedPlaces };
