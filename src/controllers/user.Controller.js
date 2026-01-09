const User = require("../models/User");

const getProfile = async(req,res) =>{
    try{
        const user = await User.findByPk(req.user.id,{
            attributes: ["id","name","email","role"]
        });
        res.json(user);
    }
    catch(error){
        res.status(500).json({message:"Failed to fetch profile"});
    }
};
    const adminOnly = async(req,res) =>{
        res.json({
            message:"Admin access granted"
        });
    };
  module.exports = {
    getProfile,
    adminOnly
  };  