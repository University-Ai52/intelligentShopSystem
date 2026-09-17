const Router = require("express")
const z = require("zod")
const User = require("../models/user")
const { signToken } = require("../lib/token")
const { auth } = require("../middleware/auth")
const { validate } = require("../middleware/validate")
const { ah } = require("../middleware/errorHandler")

const router= Router();
const registerSchema=z.object({
    email:z.string().email(),
    password:z.string().min(6),
    firstName:z.string().min(3),
    lastName:z.string().min(3),
    phone:z.string().optional(),
})

const loginSchema=z.object({
    email:z.string().email(),
    password:z.string().min(6),
});

router.post("/register",validate(registerSchema),ah(async(req,res)=>{
    const exists=await User.findOne({email:req.body.email});
    if(exists) return res.status(409).json({message:"Email already exists"});
    const user=await User.create(req.body);
    res.status(201).json({user:user.toJSON(),accessToken:signToken(user)});
}));

router.post("/login",validate(loginSchema),ah(async(req,res)=>{
    const user=await User.findOne({email:req.body.email}).select("+password");
    if(!user || !(await user.checkPassword(req.body.password))){
        return res.status(401).json({message:"Invalid email or password"});
    }
    res.json({user:user.toJSON(),accessToken:signToken(user)});
}));

router.post("/logout",auth,(_req,res)=>{
    res.json({message:"Logged out successfully"});
});

router.get("/me",auth,(req,res)=>{
    res.json(req.user.toJSON());
});

module.exports =  router;
