const { Buyer, Ad, Admin } = require("../models"); 
const adminController = {
  // delete an ad
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

  // approve/reject ads
  async approveOrRejectAd(req, res) {
    try {
      const { adId } = req.params;
      const { status } = req.body; // status can be "approved" or "rejected"

      const ad = await Ad.findByPk(adId);

      if (!ad) {
        return res.status(404).json({ message: "Ad not found" });
      }

      ad.status = status; // Update the status
      await ad.save();

      res.status(200).json({ message: `Ad ${status} successfully`, ad });
    } catch (error) {
      res.status(500).json({ message: "Error updating ad status", error: error.message });
    }
  },

  // manage ads
  async createAd(req, res) {
    try {
      const { title, description, imageUrl, link } = req.body;
      const ad = await Ad.create({ title, description, photo: imageUrl, link }); // Changed imageUrl to photo to match model
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
      ad.photo = imageUrl; // Changed imageUrl to photo to match model
      ad.link = link;
      await ad.save();

      res.status(200).json({ message: "Ad updated successfully", ad });
    } catch (error) {
      res.status(500).json({ message: "Error updating ad", error: error.message });
    }
  },


  // ban users or flag content
  async banUser(req, res) {
    try {
      const { buyerId } = req.params;
      const user = await Buyer.findByPk(buyerId);

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

  // view reports
  async viewReports(req, res) {
    try {
      const reports = await Admin.findAll(); // Changed to Admin.findAll()
      res.status(200).json({ reports });
    } catch (error) {
      res.status(500).json({ message: "Error fetching reports", error: error.message });
    }
  },
};

module.exports = adminController;
