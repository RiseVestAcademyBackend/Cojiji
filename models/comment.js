const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Buyer = require("./buyer");
const Ad = require("./ad");

class Comments extends Model {}

Comments.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: null,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    buyerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Buyer,
        key: "id",
      },
    },

    adId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Ad,
        key: "id",
      },
    },
    votes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 0,
    },
  },
  {
    sequelize,
    modelName: "comments",
  }
);

// Every comment must belong to a buyer
Comments.belongsTo(Buyer);

// A buyer and an Ad can have many comments linked to them
Buyer.hasMany(Comments);
Ad.hasMany(Comments);

module.exports = Comments;
