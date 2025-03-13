const Ad = require("../models/ad")

// Create and post an ad
exports.createAd = async(req, res) => {
    try{
        const {title, description, price, category, photo, sellerId} = req.body;
        const newAd = await Ad.create({title, description, price, category, photo, sellerId})
        res.status(201).json(newAd)
    }  
    catch(error){
        res.status(500).json({message: "Error creating ad", error:error.message});
    }
}

//Get all ads
exports.getAllAds = async(req, res) => {
    try{
        const allAds = await Ad.findAll();
        res.json(allAds) 
    }
    catch(error){
        res.status(500).json({message: "Error fetching ads", error: error.message});
    }
}


//Get Ads by ID
exports.getAdById = async(req, res) => {
    try{
        const ad = await Ad.findByPk(req.params.id);
        if(!ad){
            return res.status(404).json({message:"Ad not found"})
        }
        res.json(ad)
    }
    catch(error){
        res.status(500).json({message: "Error fetching ads", error: error.message});
    }
}

//Edit or Update Ad
exports.updateAd = async(req, res) => {
    try{
        const {title, description, price, category, photo} = req.body;
        const ad = await Ad.findByPk(req.params.id);
        if(!ad){
            return res.status(404).json({message:"Ad not found"})
        }
        ad.update({title, description, price,category, photo});
        res.json(ad);
    }
    catch(error){
        res.status(500).json({message: "Error updating ad", error:error.message});
    }
}

exports.deleteAd = async(req, res) => {
    try{
        const ad = await Ad.findByPk(req.params.id);
        if(!ad){
            return res.status(404).json({message:"Ad not found"})
        }
        ad.destroy();
        res.json({message: "Ad deleted successfully"})
    }
    catch(error){
        res.status(500).json({message: "Error deleting ad", error:error.message});
    }
}
