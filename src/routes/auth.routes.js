const express = require("express");
const {register,login} = require("../controllers/auth.Controller");
const {auth} = require("../validators/schemas");
const validate = require("../validators/validation.middleware");
const router = express.Router();
router.post("/register",validate(auth.register),register);
router.post("/login",validate(auth.login),login);
module.exports = router;
