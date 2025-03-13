const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
var bycrt = require("bcryptjs");

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
            type: DataTypes.h,
            allowNull: false,
        },
        is_verified: {
            type: DataTypes.BOOLEAN,
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

module.exports = Buyer