const mongoose=require("mongoose")

const noteSchema=mongoose.Schema({
    title:String,
    Description:String,
     userID:String,
    username:String
 
})

const noteModules=mongoose.model("note",noteSchema)
module.exports={noteModules}