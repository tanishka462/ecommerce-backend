const express = require("express");
const authMiddleware = require("../middlewares/auth");
const roleMiddleware = require("../middlewares/role");

const {getProfile,adminOnly} = require("../controllers/user.Controller");

const router = express.Router();

router.get("/profile",authMiddleware,getProfile);
router.get("/admin-test",authMiddleware,roleMiddleware("ADMIN"),adminOnly);
module.exports = router;
