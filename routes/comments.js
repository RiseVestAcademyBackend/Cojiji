const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentsController");
 
router.get("/:adId/comments", commentController.getAllComments);
router.get("/:adId/comments/:commentId", commentController.getSingleComment);
 

module.exports = router;
