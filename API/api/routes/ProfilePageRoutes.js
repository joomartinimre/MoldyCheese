const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const ProfilePageController = require('../controllers/ProfilePageController');

router.get("/:user_ID", ProfilePageController.get_user_ID);

router.post("/picture", upload.single("picture"), ProfilePageController.post_picture);

router.put("/username", ProfilePageController.put_username);

module.exports = router;
