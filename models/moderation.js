const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./seller");
const Comment = require("./comment");

class Moderation extends Model {}


Moderation.init(
    {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    },
    targetId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM("comment", "scam"),
        allowNull: false
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    sequelize,
    modelName: "Moderation"
}
);

Moderation.belongsTo(User);
User.hasMany(Moderation);

Moderation.belongsTo(Comment);
Comment.hasMany(Moderation);

module.exports = Moderation;