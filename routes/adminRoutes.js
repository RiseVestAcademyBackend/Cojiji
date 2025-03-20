const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// delete a post
router.delete("/posts/:postId", adminController.deletePost);

// approve/reject posts
router.put("/posts/:postId/status", adminController.approveOrRejectPost);

// manage ads
router.post("/ads", adminController.createAd);
router.put("/ads/:adId", adminController.updateAd);
router.delete("/ads/:adId", adminController.deleteAd);

// ban users or flag content
router.put("/users/:userId/ban", adminController.banUser);
router.put("/posts/:postId/flag", adminController.flagContent);

// view reports
router.get("/reports", adminController.viewReports);

module.exports = router;