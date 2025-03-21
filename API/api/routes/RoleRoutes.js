const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  promoteToAdmin,
  demoteToUser
} = require("../services/RoleService");

/**
 * Összes felhasználó lekérése
 */
router.get("/all", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("❌ Hiba a /all végpontnál:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Felhasználó adminná tétele
 */
router.post("/promote/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const result = await promoteToAdmin(userId);
    res.json(result);
  } catch (error) {
    console.error("❌ Hiba a /promote/:id végpontnál:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Felhasználó visszaállítása User-re
 */
router.post("/demote/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const result = await demoteToUser(userId);
    res.json(result);
  } catch (error) {
    console.error("❌ Hiba a /demote/:id végpontnál:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
