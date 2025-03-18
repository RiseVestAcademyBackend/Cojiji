const express = require("express");
const router = express.Router();
const sellerController = require("../controllers/sellerController");

router.post("/", sellerController.createAd);
router.get("/", sellerController.getAllAds);
router.get("/:id", sellerController.getAdById);
router.put("/:id", sellerController.updateAd);
router.delete("/:id", sellerController.deleteAd);
 

module.exports = router;