const {verifyToken } = require("../lib/token.js")
const User = require("../models/user.js")

const auth =  async function (req,res,next){
    const header=req.headers.authorization||"";
    const token=header.startsWith("Bearer ")?header.slice(7):null;
    if(!token) return res.status(401).json({message:"Authentication required"});
    try{
        const payload=verifyToken(token);
        const user=await User.findById(payload.sub);
        if(!user||!user.isActive) return res.status(401).json({message:"Invalid token"});
        req.user=user;
        next();
    }catch{
        return res.status(401).json({message:"Invalid token"});
    }
}

const requireAdmin = function (req,res,next){
    if(req.user?.role!=="admin") return res.status(403).json({message:"Admin only"});
    next();
}

module.exports = { auth, requireAdmin };