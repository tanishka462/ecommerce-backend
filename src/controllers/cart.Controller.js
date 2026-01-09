const Cart = require("../models/cart");
const CartItem = require("../models/cartItem");
const Product = require("../models/product");

const addToCart = async(req,res) =>{
    try{
        const {productId,quantity} = req.body;
            let cart = await Cart.findOne({where:{userId:req.user.id}});
            if(!cart){
                cart = await Cart.create({userId:req.user.id});
            }
            let cartItem = await CartItem.findOne({
                where:{cartId:cart.id,productId}
            });
            if(cartItem){
                cartItem.quantity+=quantity;
                await cartItem.save();
            }
            else{
                cartItem = await CartItem.create({
                    cartId:cart.id,
                    productId,
                    quantity
                });
            }
            res.json({message:"Product added to Cart",cartItem});
    }
    catch(error){
        return res.status(500).json({message:"Failed to add to cart"});
    }
};

const getCart = async(req,res) =>{
    try{
        const cart = await Cart.findOne({
            where:{userId:req.user.id},
            include:[{model:CartItem,include:[Product]}]
        });
        if(!cart)
                return res.json({cart:[]});
            res.json(cart);
    }
    catch(error){
        res.status(500).json({message:"Failed to fetch cart"});
    }
};
const removeFromCart = async(req,res) =>{
    try{
        const {itemId} = req.params;
        const cartItem = await CartItem.findByPk(itemId);
        if(!cartItem) return res.status(404).json({message:"Item not found"});
        await cartItem.destroy();
        res.json({message:"Item Removed"});
    }
    catch(error){
        return res.status(500).json({message:"Failed to remove item"});
    }
};

module.exports = {
    addToCart,
    getCart,
    removeFromCart
};
