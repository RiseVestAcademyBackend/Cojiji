const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Seller = require("./seller");

class Ad extends Model {}

Ad.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
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
    modelName: "Ad",
  }
);

Ad.belongsTo(Seller, {
  foreignKey: "sellerId",
});

Seller.hasMany(Ad, {
  foreignKey: "sellerId",
});

module.exports = Ad;
