const Order = require("../models/order");
const OrderItem = require("../models/orderItem");
const Cart = require("../models/cart");
const CartItem = require("../models/cartItem");
const Product = require("../models/product");
const placeOrder = async(req,res) =>{
    try{
        const cart = await Cart.findOne({
            where:{userId:req.user.id},
            include:[{model:CartItem,include:[Product]}]
        });
        if(!cart || cart.CartItems.length === 0) {
            return res.status(400).json({message:"Cart is Empty"});
        }
        let totalAmount = 0;
        cart.CartItems.forEach(item =>{
            totalAmount+=item.quantity * item.Product.price
        });
        const order = await Order.create({
            userId:req.user.id,
            totalAmount
        });
        for(let item of cart.CartItems){
            await OrderItem.create({
                orderId:order.id,
                productId:item.productId,
                quantity:item.quantity,
                price:item.Product.price
            });
             await Product.decrement("stock", {
                by: item.quantity,
                  where: { id: item.productId }
            });
         }
            await CartItem.destroy({where:{cartId:cart.id}});
            res.status(201).json({message:"Order Placed Successfully",orderId:order.id});
    }
  catch (error) {
  console.error("Order Error:", error);
    res.status(500).json({
    message: "Order Failed",
    error: error.message
  });
}
};
const getMyOrders = async(req,res) =>{
    try{
        const orders = await Order.findAll({
            where:{userId:req.user.id},
            include :[{model:OrderItem,include:[Product]}]
        });
        res.json(orders);
    }
    catch(error){
        return res.status(500).json({message:"Failed to fetch orders"});
    }
};

const getAllOrders = async(req,res) =>{
    try{
        const orders = await Order.findAll({
            include:[{model:OrderItem,include:[Product]}]
        });
        res.json(orders);
    }
    catch(error){
        return res.status(500).json({message:"Failed to fetch orders"});
    }
}
const updateOrderStatus = async(req,res) =>{
    try{
        const {status} = req.body;
        const order = await Order.findByPk(req.params.orderId);
        if(!order) return res.status(404).status(404).json({message:"Order not found"});
        order.status = status;
        await order.save();
        res.json({message:"Order status updated"});
    }
    catch(error){
        return res.status(500).json({message:"Failed to update order"});
    }
};
const cancelOrder = async(req,res) =>{
    try{
        const orderId = req.params.orderId;
        const order = await Order.findOne({
            where:{
                id:orderId,
                userId:req.user.id
            },
            include:[{model:OrderItem}]
        });
        if(!order){
            return res.status(404).json({message:"Order not found"});
        }
        if(order.status !== "PLACED"){
            return res.status(400).json({
                message:"Order Cannot be Cancelled now"
            });
        }
        for(let item of order.OrderItems){
            await Product.increment("stock",{
                by:item.quantity,
                where: {id:item.productId}
            });
        }
        order.status = "CANCELLED";
        await order.save();
        res.json({message:"Order Cancelled Successfully"});
    }
    catch(error){
        res.status(500).json({message:"Order Cancellation Failed"});
    }
};

module.exports = {
    placeOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,
    cancelOrder
};

