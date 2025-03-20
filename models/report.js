const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Ad = require("./ad");
const Buyer = require("./buyer");

class Report extends Model { }

Report.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "resolved"),
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    modelName: "Report",
  }
);

// Every report must belong to a user (reporter)
Report.belongsTo(Buyer, { foreignKey: "reporterId" });

// A user can have many reports
Buyer.hasMany(Report, { foreignKey: "reporterId" });

// Every report must belong to a post
Report.belongsTo(Ad, { foreignKey: "postId" });

// A post can have many reports
Ad.hasMany(Report, { foreignKey: "postId" });

module.exports = Report;