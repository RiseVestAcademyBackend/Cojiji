const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// delete a post
router.delete("/posts/:postId", adminController.deleteAd);

// approve/reject posts
router.put("/posts/:postId/status", adminController.approveOrRejectAd);

// manage ads
router.post("/ads", adminController.createAd);
router.put("/ads/:adId", adminController.updateAd);
router.delete("/ads/:adId", adminController.deleteAd);

// ban users or flag content
router.put("/users/:userId/ban", adminController.banUser);

// view reports
router.get("/reports", adminController.viewReports);

module.exports = router;