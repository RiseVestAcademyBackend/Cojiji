const express = require("express");
const router = express.Router();
const sellerController = require("../controllers/sellerController");

router.post("/ads", sellerController.createAd);
router.get("/ads", sellerController.getAllAds);
router.get("/ads/:id", sellerController.getAdById);
router.put("/ads/:id", sellerController.updateAd);
router.delete("/ads/:id", sellerController.deleteAd);
 

module.exports = router;