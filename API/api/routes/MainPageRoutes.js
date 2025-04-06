const express = require("express");
const router = express.Router();
const MainPageController = require('../controllers/MainPageController');

router.get("/image/:id", MainPageController.get_image_id);
router.get("/popular", MainPageController.get_popular);
router.post("/recent", MainPageController.post_recent);
router.get("/latest", MainPageController.get_latest);
router.get("/top-rated", MainPageController.get_top_rated);

module.exports = router;
