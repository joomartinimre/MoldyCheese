const express = require("express");
const router = express.Router();
const PlaceLikeController = require("../controllers/PlaceLikeController");

router.post("/placelike", PlaceLikeController.toggleLike);
router.get("/placelike/:user_ID/:place_ID", PlaceLikeController.getUserLike);

module.exports = router;
