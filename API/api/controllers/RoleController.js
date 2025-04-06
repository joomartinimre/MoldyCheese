const {
    getAllUsers,
    promoteToAdmin,
    demoteToUser
  } = require("../services/RoleService");
  
  exports.get_all = async (req, res) => {
    try {
      const users = await getAllUsers();
      res.json(users);
    } catch (error) {
      console.error("❌ Hiba a /all végpontnál:", error);
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.post_promote_id = async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const result = await promoteToAdmin(userId);
      res.json(result);
    } catch (error) {
      console.error("❌ Hiba a /promote/:id végpontnál:", error);
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.post_demote_id = async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const result = await demoteToUser(userId);
      res.json(result);
    } catch (error) {
      console.error("❌ Hiba a /demote/:id végpontnál:", error);
      res.status(500).json({ error: error.message });
    }
  };
  