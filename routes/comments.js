const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentsController");
 
router.get("/:adId/comments", commentController.getAllComments);
router.get("/:adId/comments/:commentId", commentController.getSingleComment);

router.post("/ad/:adId/comment", commentController.createComment)
router.patch("/comment/:commentId", commentController.updateComment)
router.post("/comment//:commentId/vote/:vote", commentController.voteComment)

module.exports = router;
