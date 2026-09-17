const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema(
{
    email:{type:String,required:true,unique:true,lowercase:true,trim:true},
    password:{type:String,required:true,minlength:6,select:false},
    firstName:{type:String,required:true,trim:true},
    lastName:{type:String,required:true,trim:true},
    role:{type:String,enum:["customer","admin"],default:"customer"},
    isActive:{type:Boolean,default:true},
    phone:{type:String,trim:true},
},
{timestamps:true}
);

userSchema.pre("save",async function(){
    if(!this.isModified("password")) return;
    this.password=await bcrypt.hash(this.password,10);
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

module.exports =  mongoose.model("User",userSchema);