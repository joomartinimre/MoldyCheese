const express = require("express");
const RatingController = require("../controllers/RatingController");
const router = express.Router();

// POST /api/rating/rating
router.post("/rating", RatingController.setRating);

module.exports = router;
