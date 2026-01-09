const express = require("express");
const auth = require("../middlewares/auth");
const {addToCart,getCart,removeFromCart} = require("../controllers/cart.Controller");
const {cart} = require("../validators/schemas");
const validate = require("../validators/validation.middleware");
const router = express.Router();

router.post("/add",auth,validate(cart.add),addToCart);
router.get("/",auth,getCart);
router.delete("/:itemId",auth,removeFromCart);

module.exports = router;
