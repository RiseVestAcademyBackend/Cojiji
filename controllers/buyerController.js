const Order = require("../models/orders");
const Favourite = require("../models/favourite");
const Ad = require("../models/ad");
const Buyer = require("../models/buyer");

// Controller to view all orders made by a buyer
exports.viewOrderHistory = async (req, res) => {
    try {
        const buyerId = req.params.buyerId;
        const orders = await Order.findAll({
            where: { buyerId: buyerId },
        });

        if (orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this buyer." });
        }

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: "Error fetching order history", error });
    }
};

exports.verifyAccount = async (req, res) => {
    try {
        const buyerId = req.params.buyerId;
        const buyer = await Buyer.findByPk(buyerId);

        if (!buyer) {
            return res.status(404).json({ message: "Buyer not found." });
        }

        buyer.is_verified = true;
        await buyer.save();

        res.status(200).json({ message: "Account verified successfully.", buyer });
    } catch (error) {
        res.status(500).json({ message: "Error verifying account", error });
    }
};


exports.saveFavourite = async (req, res) => {
    try {
        const { buyerId, adId } = req.body;

        const buyer = await Buyer.findByPk(buyerId);
        const ad = await Ad.findByPk(adId);

        if (!buyer || !ad) {
            return res.status(404).json({ message: "Buyer or Ad not found." });
        }

        const favourite = await Favourite.create({ BuyerId: buyerId, AdId: adId });

        res.status(200).json({ message: "Ad saved to favourites.", favourite });
    } catch (error) {
        res.status(500).json({ message: "Error saving to favourites", error });
    }
};

 
 