import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
{
    email:{type:string,required:true,unique:true,lowercase:true,trim:true},
    password:{type:string,required:true,minlength:6,select:false},
    firstName:{type:string,required:true,trim:true},
    lastName:{type:string,required:true,trim:true},
    role:{type:string,enum:["customer","admin"],default:"customer"},
    isActive:{type:boolean,default:true},
    phone:{type:string,trim:true},
},
{timestamps:true}
);

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password=await bcrypt.hash(this.password,10);
    next();
});

userSchema.methods.checkPassword=function(plain){
    return bcrypt.compare(plain,this.password);
}
userSchema.set("toJSON",{
    transform:(_doc,ret)=>{
        delete ret.password;
        delete ret.__v;
        return ret;
    },
});

export default mongoose.model("User",userSchema);