<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const buyerController = require("../controllers/buyerController");
 
router.get("/:buyerId/orders", buyerController.viewOrderHistory);
router.patch("/:buyerId/verify", buyerController.verifyAccount);
router.post("/favorites", buyerController.saveFavourite);
 
=======
var express = require('express');
var router = express.Router();

router.get('/buyers', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
>>>>>>> c84fb18920d6c37384310f81b02cfcb96ab89af9

module.exports = router;
