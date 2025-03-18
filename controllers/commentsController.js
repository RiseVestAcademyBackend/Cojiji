const Joi = require('joi');
const sanitize = require('sanitize-html');

const Ad = require("../models/ad");
const Buyer = require("../models/buyer");
const Comments = require("../models/comment");

const commentSchema = Joi.object({
  buyer: Joi.string().trim().uuid().required(),
  comment: Joi.string().trim().required().max(500)
});

const commentParamsSchema = Joi.object({
  adId: Joi.string().trim().uuid().required(),
});

const editParamsSchema = Joi.object({
  commentId: Joi.string().trim().uuid().required(),
});

const editSchema = Joi.object({
  comment: Joi.string().trim().required().max(500)
});

const voteParamsSchema = Joi.object({
  commentId: Joi.string().trim().uuid().required(),
  vote: Joi.string().trim().valid("upvote", "downvote").required()
});

//create a comment on an ad
exports.createComment = async (req, res) => {
  try {
    const { adId } = await commentParamsSchema.validateAsync(req.params)
      const {buyer, comment} = await commentSchema.validateAsync(req.body);

      const [_buyer, _ad] = await Promise.all([
        buyerModel.findByPk(buyer),
        adModel.findByPk(adId)
      ])

      if (!_buyer || !_ad) {
          return res.status(404).json({ message: 'Buyer or Ad not found.' });
      }

      const _comment = await commentModel.create({
          buyerId: buyer,
          adId: adId,
          content: comment
      });

      res.status(200).json({ message: 'Comment created', _comment });
  } catch (error) {
      res.status(500).json({ message: 'Error creating comment', error });
  }
};

//update a comment
exports.updateComment = async (req, res) => {
  try {
    const { commentId } = await editParamsSchema.validateAsync(req.params);
    const { comment } = await editSchema.validateAsync(req.body);

    const _comment = await commentModel.findByPk(commentId);

    if (!_comment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    const duration = new Date(Date.now() - 15 * 60 * 1000);

    if (_comment.createdAt < duration) {
      return res.status(403).json({ message: "Comment can only be updated within 15 minutes of creation." });
    }

    _comment.content = comment;
    await _comment.save();

    res.status(200).json({ message: "Comment updated", _comment });
  } catch (error) {
    res.status(500).json({ message: "Error updating comment", error });
  }
};

//upvote or downvote a comment
exports.voteComment = async (req, res) => {
  try {
    const { commentId, vote } = await voteParamsSchema.validateAsync(req.params);

    const _comment = await commentModel.findByPk(commentId);

    if (!_comment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    _comment.votes = _comment.votes + vote == "upvote" ? 1 : -1;
    await _comment.save();

    res.status(200).json({ message: "Vote successful", _comment });
  } catch (error) {
    res.status(500).json({ message: "Error updating comment", error });
  }
};


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
