const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Seller extends Model {
  async verify(password) {
    return await bycrt.compare(password, this.password)
  }
}

Seller.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4

    },

  },
  {
    sequelize,
    modelName: "Seller",
    hooks: {
      beforeCreate: async (user, opts) => {
        user.password = await bycrt.hash(user.password, 10)
      }

    }
  }
);

module.exports = Seller;
