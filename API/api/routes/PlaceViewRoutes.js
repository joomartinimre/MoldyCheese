const express = require("express");
const router = express.Router();
const PlaceViewController = require('../controllers/PlaceViewController');

router.get("/:topic", PlaceViewController.get_topic);

module.exports = router;
