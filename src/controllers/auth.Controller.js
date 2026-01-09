const User = require("../models/User");
const {hashPassword,comparePassword} = require("../utils/hash");
const {generateToken} = require("../utils/jwt");
const register = async(req,res) =>{
    try{
        const {name,email,password,role} = req.body;
        const existingUser = await User.findOne({where:{email} });
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const hashedPassword = await hashPassword(password);
        const userRole = role && role.toUpperCase() === "ADMIN" ? "ADMIN" : "USER";
        const user = await User.create({
            name,
            email,
            password:hashedPassword,
            role:userRole
        });
        res.status(201).json({
            message:"User Registered Successfully",
            userId:user.id,
            role:role.id
        });
    }
    catch(error){
        res.status(500).json({message:"User Registration Failed"});
    }
};
const login = async(req,res) =>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({where: {email}});
        if(!user){
            return res.status(400).json({message:"User Not Found"});
        }
        const isMatch = await comparePassword(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        const token =generateToken({
            id:user.id,
            role:user.role
        });
        res.json({
            message:"Login Successfull",
            token
        });
    }
   catch (error) {
  console.error("Login Error:", error);
  res.status(500).json({
    message: "Login Failed",
    error: error.message
  });
}
};
module.exports = {
    register,
    login
};
