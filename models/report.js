const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");
const Post = require("./post");

class Report extends Model {}

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
    // Foreign key linking report to the user who reported
    reporterId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    // Foreign key linking report to the post being reported
    postId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Post,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Report",
  }
);

// Every report must belong to a user (reporter)
Report.belongsTo(User, { foreignKey: "reporterId" });

// A user can have many reports
User.hasMany(Report, { foreignKey: "reporterId" });

// Every report must belong to a post
Report.belongsTo(Post, { foreignKey: "postId" });

// A post can have many reports
Post.hasMany(Report, { foreignKey: "postId" });

module.exports = Report;