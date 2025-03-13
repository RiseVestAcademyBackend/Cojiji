const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Seller extends Model {}
Seller.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull:false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Seller",
  }
);

module.exports = Seller;
