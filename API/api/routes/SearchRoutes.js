const express = require("express");
const router = express.Router();
const SearchController = require('../controllers/SearchController');

router.get("/:term", SearchController.get_term);

module.exports = router;
