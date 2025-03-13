const { Post, User, Ad, Report } = require("../models"); // Import our models for post, user, ads and reports

const adminController = {
  // delete a post
  async deletePost(req, res) {
    try {
      const { postId } = req.params;
      const post = await Post.findByPk(postId);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      await post.destroy();
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting post", error: error.message });
    }
  },

  // approve/reject posts
  async approveOrRejectPost(req, res) {
    try {
      const { postId } = req.params;
      const { status } = req.body; // status can be "approved" or "rejected"

      const post = await Post.findByPk(postId);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      post.status = status;
      await post.save();

      res.status(200).json({ message: `Post ${status} successfully`, post });
    } catch (error) {
      res.status(500).json({ message: "Error updating post status", error: error.message });
    }
  },

  // manage ads
  async createAd(req, res) {
    try {
      const { title, description, imageUrl, link } = req.body;
      const ad = await Ad.create({ title, description, imageUrl, link });
      res.status(201).json({ message: "Ad created successfully", ad });
    } catch (error) {
      res.status(500).json({ message: "Error creating ad", error: error.message });
    }
  },

  async updateAd(req, res) {
    try {
      const { adId } = req.params;
      const { title, description, imageUrl, link } = req.body;

      const ad = await Ad.findByPk(adId);

      if (!ad) {
        return res.status(404).json({ message: "Ad not found" });
      }

      ad.title = title;
      ad.description = description;
      ad.imageUrl = imageUrl;
      ad.link = link;
      await ad.save();

      res.status(200).json({ message: "Ad updated successfully", ad });
    } catch (error) {
      res.status(500).json({ message: "Error updating ad", error: error.message });
    }
  },

  async deleteAd(req, res) {
    try {
      const { adId } = req.params;
      const ad = await Ad.findByPk(adId);

      if (!ad) {
        return res.status(404).json({ message: "Ad not found" });
      }

      await ad.destroy();
      res.status(200).json({ message: "Ad deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting ad", error: error.message });
    }
  },

  // ban users or flag content
  async banUser(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.status = "banned";
      await user.save();

      res.status(200).json({ message: "User banned successfully", user });
    } catch (error) {
      res.status(500).json({ message: "Error banning user", error: error.message });
    }
  },

  async flagContent(req, res) {
    try {
      const { postId } = req.params;
      const post = await Post.findByPk(postId);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      post.isFlagged = true;
      await post.save();

      res.status(200).json({ message: "Content flagged successfully", post });
    } catch (error) {
      res.status(500).json({ message: "Error flagging content", error: error.message });
    }
  },

  // view reports
  async viewReports(req, res) {
    try {
      const reports = await Report.findAll();
      res.status(200).json({ reports });
    } catch (error) {
      res.status(500).json({ message: "Error fetching reports", error: error.message });
    }
  },
};

module.exports = adminController;