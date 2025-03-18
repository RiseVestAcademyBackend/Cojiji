const Ad = require("../models/ad");
const Buyer = require("../models/buyer");
const Comments = require("../models/comment");

// Controller to get all comments on an ad
exports.getAllComments = async (req, res) => {
  try {
    const adId = req.params.adId;
    const comments = await Comments.findAll({
      where: { adId },
    });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: String(error) });
  }
};

// Controller to get single comment on an ad
exports.getSingleComment = async (req, res) => {
  try {
    const adId = req.params.adId;
    const commentId = req.params.commentId;

    const comment = await Comments.findOne({
      where: { adId, id: commentId },
    });

    if (comment !== null) res.status(200).json({ comment });
    else res.status(404).json({ message: "Comment not found" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: String(error) });
  }
};
