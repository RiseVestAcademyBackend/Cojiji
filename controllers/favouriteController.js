const { Favourite, Ad, Buyer } = require('../models');

exports.addFavourite = async (req, res) => {
  try {
    const { buyerId, adId } = req.body;

    // Validate input
    if (!buyerId || !adId) {
      return res.status(400).json({ success: false, message: "Buyer ID and Ad ID are required" });
    }

    // Check if buyer and ad exist
    const [buyer, ad] = await Promise.all([
      Buyer.findByPk(buyerId),
      Ad.findByPk(adId)
    ]);

    if (!buyer) {
      return res.status(404).json({ success: false, message: "Buyer not found" });
    }

    if (!ad) {
      return res.status(404).json({ success: false, message: "Ad not found" });
    }

    // Check if already favorited
    const existingFavourite = await Favourite.findOne({
      where: { BuyerId: buyerId, AdId: adId }
    });

    if (existingFavourite) {
      return res.status(400).json({ success: false, message: "Ad already in favorites" });
    }

    // Create favourite
    const favourite = await Favourite.create({
      BuyerId: buyerId,
      AdId: adId
    });

    res.status(201).json({
      success: true,
      message: "Ad added to favorites",
      data: favourite
    });
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add to favorites",
      error: error.message
    });
  }
};

exports.removeFavourite = async (req, res) => {
  try {
    const { buyerId, adId } = req.params;

    // Validate input
    if (!buyerId || !adId) {
      return res.status(400).json({ success: false, message: "Buyer ID and Ad ID are required" });
    }

    // Find the favourite
    const favourite = await Favourite.findOne({
      where: { BuyerId: buyerId, AdId: adId }
    });

    if (!favourite) {
      return res.status(404).json({ success: false, message: "Favorite not found" });
    }

    // Delete the favourite
    await favourite.destroy();

    res.status(200).json({
      success: true,
      message: "Removed from favorites successfully"
    });
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).json({
      success: false,
      message: "Failed to remove from favorites",
      error: error.message
    });
  }
};
