const express = require("express");
const router = express.Router();
const moderationController = require("../controllers/moderationController");

router.post("/flagcomment", moderationController.flagComment);
router.post("/reportscam", moderationController.reportScam);
router.get("/flaggedcomments", moderationController.getFlaggedComments);
router.get("/reportedscams", moderationController.getReportedScams);


module.exports = router;
