const express = require("express");
const CommentController = require("../controllers/CommentController");
const router = express.Router();

router.post("/comment", CommentController.addComment);

router.get("/comments/:place_ID", CommentController.getCommentsByPlace);

router.delete("/comment/:id", CommentController.deleteComment);

module.exports = router;
