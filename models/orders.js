const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Buyer = require("./buyer");
const Ad = require("./ad");

class Order extends Model { }

Order.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        status: {
            type: DataTypes.ENUM,
            values: ["failed", "inprogress", "successful"],

            defaultValue: "inprogress",
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "Order",
    }
);

//@xutini notice how I did not set any fields for the Ids , it is intentional , they would be set on auto

// also notice the order to Ad is a m-m rel , take heed in your queries
Buyer.hasMany(Order)
Order.belongsTo(Buyer)

Order.belongsToMany(Ad, { through: 'OrderAd' }); // Join table 'OrderAd'
Ad.belongsToMany(Order, { through: 'OrderAd' });

module.exports = Order