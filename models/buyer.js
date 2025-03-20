const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
var bycrt = require("bcryptjs");
const Seller = require("./seller");
const Admin = require("./admin");

/**
 * Buyer Model is the base model since everybody can be a buyer .
 */
class Buyer extends Model {
    ///@xutini Method to ensure verification of password -- please do not change  
    async verify(password) {
        return await bycrt.compare(password, this.password)
    }
}

Buyer.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        fullname: {
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
        is_verified: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: false
        }
    },
    {
        sequelize,
        modelName: "Buyer",
        hooks: {
            // @xutini this hook is too make sure the password is hashed before saving 
            beforeCreate: async (user, opts) => {
                user.password = await bycrt.hash(user.password, 10)
            }

        }
    }
);
// Sellers have shared info in the buyers , I could write an inheritance but that would be too complex

Buyer.belongsTo(Seller)
Seller.hasOne(Buyer)

// admins have shared info in the buyers , I could write an inheritance but that would be too complex
Buyer.belongsTo(Admin)
Admin.hasOne(Buyer)

module.exports = Buyer