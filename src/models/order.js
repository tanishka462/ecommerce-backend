const {DataTypes} = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Order = sequelize.define("Orders",{
    userId : {
        type:DataTypes.INTEGER,
        allowNull:false
    },
    totalAmount : {
        type:DataTypes.FLOAT,
        allowNull:false
    },
    status:{
        type:DataTypes.ENUM("PLACED","SHIPPED","DELIEVERED","CANCELLED"),
        defaultValue:"PLACED"
    }
});

User.hasMany(Order,{foreignKey:"userId"});
Order.belongsTo(User,{foreignKey:"userId"});
module.exports = Order;
