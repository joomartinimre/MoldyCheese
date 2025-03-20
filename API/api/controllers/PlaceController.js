const placeService = require("../services/PlaceService");

class PlaceController {
    async createPlace(req, res) {
        try {
            console.log("📥 Beérkező adatok:", req.body);
            console.log("📸 Beérkező fájl:", req.file);
            
            const { name, text, tags, topic_ID } = req.body;
            const pictureBuffer = req.file ? req.file.buffer : null;
            const topic_ID_Int = parseInt(topic_ID, 10);
            const tagsArray = typeof tags === "string" ? JSON.parse(tags) : tags;
            const nameStr = typeof name === "string" ? name : JSON.stringify(name);
            const textStr = typeof text === "string" ? text : JSON.stringify(text);

            console.log("🛠️ Debug – Átalakított értékek:");
            console.log("🔹 name:", nameStr, "🔹 text:", textStr);
            console.log("🔹 topic_ID:", topic_ID_Int, "🔹 picture méret:", pictureBuffer ? pictureBuffer.length : "nincs kép");
            console.log("🔹 tags:", tagsArray);

            if (!nameStr || !textStr || !tagsArray || !topic_ID_Int || !pictureBuffer) {
                console.log("⚠️ Hiányzó mező(ke)k!");
                return res.status(400).json({ message: "Minden mező kötelező!" });
            }

            const place = await placeService.createPlace({ 
                name: nameStr, 
                text: textStr, 
                tags: tagsArray, 
                topic_ID: topic_ID_Int, 
                picture: pictureBuffer  
            });

            return res.status(201).json(place);
        } catch (error) {
            console.error("❌ Szerveroldali hiba:", error.message);
            return res.status(500).json({ message: "Hiba történt a hely létrehozásakor.", error: error.message });
        }
    }
}

module.exports = new PlaceController();
