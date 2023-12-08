const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    userName:String,
    email:String,
    pass:String
})

const userModules=mongoose.model("user",userSchema)
module.exports={userModules}