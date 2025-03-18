const express = require("express");
const multer = require("multer");
const placeController = require("../controllers/PlaceController");

const router = express.Router();
const upload = multer();

router.post("/create", upload.single("picture"), placeController.createPlace);

module.exports = router;
