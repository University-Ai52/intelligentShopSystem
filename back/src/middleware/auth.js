import{verifyToken} from "../lib/token.js";
import User from "../models/User.js";

export async function auth(req,res,next){
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

export function requireAdmin(req,res,next){
    if(req.user?.role!=="admin") return res.status(403).json({message:"Admin only"});
    next();
}
