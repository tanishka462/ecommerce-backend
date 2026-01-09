const roleMiddleware = (requiredRole) =>{
    return (req,res,next) =>{
        if(!req.user) {
            return res.status(403).json({message:"Access Denied"});
        }
        if(req.user.role !== requiredRole){
            return res.status(403).json({
                message:"You are not allowed to access this resource"
            });
        }
        next();
    };
};
module.exports = roleMiddleware;
