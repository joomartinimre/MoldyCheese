const ProfilePageService = require("../services/ProfilePageService");

exports.get_user_ID = async (req, res) => {
  try {
    const { user_ID } = req.params;
    const stats = await ProfilePageService.getUserProfileStats(user_ID);
    res.json(stats);
  } catch (error) {
    console.error("[Profile GET]", error);
    res.status(500).json({ error: "Nem sikerült betölteni a felhasználói adatokat." });
  }
};

exports.post_picture = async (req, res) => {
  try {
    console.log("📸 Beérkező fájl:", req.file);
    const { user_ID } = req.body;
    const pictureBuffer = req.file ? req.file.buffer : null;
    if (!pictureBuffer) return res.status(400).json({ error: "Hiányzó kép." });

    const result = await ProfilePageService.updateProfilePicture(user_ID, pictureBuffer);
    res.json(result);
  } catch (error) {
    console.error("[Profile Picture POST]", error);
    res.status(500).json({ error: "Nem sikerült frissíteni a profilképet." });
  }
};

exports.put_username = async (req, res) => {
  try {
    const { user_ID, newUserName } = req.body;
    console.log(req.body);
    if (!newUserName) return res.status(400).json({ error: "A név nem lehet üres." });

    const result = await ProfilePageService.updateUserName(user_ID, newUserName);
    res.json(result);
  } catch (error) {
    console.error("[Username PUT]", error);
    res.status(500).json({ error: "Nem sikerült módosítani a felhasználónevet." });
  }
};
