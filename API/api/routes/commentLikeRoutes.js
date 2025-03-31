
const express = require("express");
const router = express.Router();
const CommentLikeController = require("../controllers/CommentLikeController");

router.post("/commentlike", CommentLikeController.toggleLike);
router.get("/commentlike/user/:user_ID", CommentLikeController.getAllUserCommentLikes);
router.get("/commentlike/:user_ID/:comment_ID", CommentLikeController.getUserLike);


module.exports = router;
