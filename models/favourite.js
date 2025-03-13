const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Buyer = require("./buyer");
const Ad = require("./ad");

class Favourite extends Model { }

Favourite.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4

        },
    },
    {
        sequelize,
        modelName: "Favourite",
    }
);

// @xutini I have set the favourite to use a one-many rel from buyers to favourites 
// @xutini and the ads use a one to many rel too , take heed in your queries ,
// what this means , is that there is no lock to Favourite and Buyer instances , One buyer can have many
// fav instances that can be distinqused by the product , this would allow for future ability to view favourite count of a product and the buyers whom favourited

Favourite.belongsTo(Buyer)
Buyer.hasMany(Favourite)

Favourite.belongsTo(Ad)
Ad.hasMany(Favourite)

module.exports = Favourite