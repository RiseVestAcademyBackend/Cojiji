const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      defaultValue: "pending",
    },
    isFlagged: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    // Foreign key linking post to user
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Post",
  }
);

// Every post must belong to a user
Post.belongsTo(User, { foreignKey: "userId" });

// A user can have many posts
User.hasMany(Post, { foreignKey: "userId" });

module.exports = Post;