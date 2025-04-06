const express = require("express");
const router = express.Router();
const PlaceDetailController = require('../controllers/PlaceDetailController');

router.post("/:id", PlaceDetailController.get_id);

module.exports = router;
