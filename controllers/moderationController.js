const Moderation = require("../models/moderation");
const User = require("../models/buyer");
const Comment = require("../models/comment");

exports.flagComment = async (req, res) => {
    try {
        const { userId, commentId, reason } = req.body;

        // Check if comment exists
        const comment = await Comment.findByPk(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Create flag entry
        await Moderation.create({
            userId,
            targetId: commentId,
            type: "comment",
            reason
        });

        return res.status(201).json({ message: "Comment flagged successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.reportScam = async (req, res) => {
    try {
        const { userId, reportedUserId, reason } = req.body;

        // Check if reported user exists
        const reportedUser = await User.findByPk(reportedUserId);
        if (!reportedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create scam report entry
        await Moderation.create({
            userId,
            targetId: reportedUserId,
            type: "scam",
            reason
        });

        return res.status(201).json({ message: "User reported as scam successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getFlaggedComments = async (req, res) => {
    try {
        const flaggedComments = await Moderation.findAll({
            where: { type: "comment" },
            include: [
                {
                    model: User,
                    as: "User",
                    attributes: ["id", "username"]
                },
                {
                    model: Comment,
                    as: "FlaggedComment",
                    attributes: ["id", "content"]
                }
            ]
        });

        return res.status(200).json(flaggedComments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getReportedScams = async (req, res) => {
    try {
        const reportedUsers = await Moderation.findAll({
            where: { type: "scam" },
            include: [
                {
                    model: User,
                    as: "User",
                    attributes: ["id", "username"]
                },
                {
                    model: User,
                    as: "ReportedUser",
                    attributes: ["id", "username"]
                }
            ]
        });

        
        return res.status(200).json(reportedUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

