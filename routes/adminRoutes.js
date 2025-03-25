const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// manage ads
router.post("/ads", adminController.createAd);
router.put("/ads/:adId", adminController.updateAd);
router.delete("/ads/:adId", adminController.deleteAd);

// ban users or flag content
router.put("/buyers/:buyerId/ban", adminController.banUser);

// view reports
router.get("/reports", adminController.viewReports);

module.exports = router;
