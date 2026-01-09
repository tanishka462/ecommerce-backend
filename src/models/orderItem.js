const {Datatypes, DataTypes} = require("sequelize");
const sequelize = require("../config/database");
const Order = require("./order");
const Product = require("./product");

const OrderItem = sequelize.define("OrderItem",{
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    price:{
        type:DataTypes.FLOAT,
        allowNull:false
    }
});
Order.hasMany(OrderItem, { foreignKey: "orderId" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });
Product.hasMany(OrderItem, { foreignKey: "productId" });
OrderItem.belongsTo(Product, { foreignKey: "productId" });
module.exports = OrderItem;
