const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/database");
const Seller = require("./seller");

class Ad extends Model{}

Ad.init(
    {
        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        price:{
            type: DataTypes.FLOAT,
            allowNull:false,
        },
        photo:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        boosted:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        //Foreign key linking ad to seller
        sellerId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: Seller,
                key: "id"
            }
        }
    },
    {
        sequelize,
        modelName: "Ad"
    }
);

//Every ad must belong to a seller
Ad.belongsTo(Seller, {foreignKey: "sellerId"});

//A seller can have many ads linked to him
Seller.hasMany(Ad, {foreignKey: "sellerId"})

module.exports = Ad;