const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Seller = require("./seller");

class Ad extends Model { }

Ad.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        boosted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
       
    },
    {
        sequelize,
        modelName: "Ad"
    }
);

//Every ad must belong to a seller
Ad.belongsTo(Seller);

//A seller can have many ads linked to him
Seller.hasMany(Ad)

module.exports = Ad;