const {DataTypes} = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");


const Cart = sequelize.define("Cart",{
    userId : {
        type: DataTypes.INTEGER,
        allowNull:false
    }
});

User.hasOne(Cart,{foreignKey:"userId"});
Cart.belongsTo(User,{foreignKey:"userId"});

module.exports = Cart;
