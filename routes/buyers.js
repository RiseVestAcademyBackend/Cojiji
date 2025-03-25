const express = require("express");
const router = express.Router();
const buyerController = require("../controllers/buyerController");
 
router.get("/:buyerId/orders", buyerController.viewOrderHistory);
router.patch("/:buyerId/verify", buyerController.verifyAccount);
router.post("/favorites", buyerController.saveFavourite);
 

module.exports = router;
