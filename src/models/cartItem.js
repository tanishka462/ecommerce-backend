const {DataTypes} = require("sequelize");
const sequelize = require("../config/database");
const Cart = require("./cart");
const Product = require("./product");

const CartItem = sequelize.define("CartItem",{
        quantity:{
            type: DataTypes.INTEGER,
            defaultValue:1
        }
});

Cart.hasMany(CartItem,{foreignKey:"cartId"});
CartItem.belongsTo(Cart,{foreignKey:"cartId"});

Product.hasMany(CartItem,{foreignKey:"productId"});
CartItem.belongsTo(Product,{foreignKey:"productId"});

module.exports = CartItem;
 
