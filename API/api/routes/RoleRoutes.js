const express = require("express");
const router = express.Router();
const RoleController = require('../controllers/RoleController');

router.get("/all", RoleController.get_all);


router.post("/promote/:id", RoleController.post_promote_id);


router.post("/demote/:id", RoleController.post_demote_id);

module.exports = router;
