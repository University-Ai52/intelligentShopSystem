const AppError = require("../utils/AppError")
const globalError = (err,req,res,next)=>{ // any middleware i send next by this is middle ware globalError middleware response it in err parameter
let error = err; // we make shallow chop to get all members that not iterable in the object
// console.log(error.statusCode)
console.log(Object.keys(error))
console.log(Object.values(error))
console.log(error.reason)
// console.log(typeof error.errorResponse.errmsg)
// console.log(Object.keys(error.reason))
// console.log(error)
console.log({cause:error.name})
if(error.kind == "ObjectId") error = new AppError(400,error.reason.split(": ")[1])
else if(error.code == 11000) error = new AppError(400,`${error.errorResponse.errmsg.replaceAll(`"`,"'")}` )
else if (error.name == "ValidationError"){ 
    console.log(error.errors); 
    let values = Object.values(error.errors).map(error => error.message.split(".")[0]).join(" , ").replaceAll('`',"").replaceAll("Path" ,'')
    console.log(values)
    error = new AppError (400, values)
}
// else if (error)
res.status(error.statusCode||500).json({
success:false,
message: error.message.toString() || "internal server Error",
stack: process.env.ENVIRONMENT == "development" ? error.stack : undefined
})
}

module.exports = globalError