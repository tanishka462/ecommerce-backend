const express = require("express");
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");
const {product} = require("../validators/schemas")
const validate = require("../validators/validation.middleware");
const {createProduct,getProducts,getProductById,updateProduct,deleteProduct} = require("../controllers/product.Controller");
const router = express.Router();
router.get("/",getProducts);
router.get("/:id",getProductById);
router.post("/create",auth,role("ADMIN"),validate(product.create),createProduct);
router.put("/update/:id",auth,role("ADMIN"),validate(product.update),updateProduct);
router.delete("/delete/:id",auth,role("ADMIN"),deleteProduct);
module.exports = router;

