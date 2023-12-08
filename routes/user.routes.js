const express=require("express");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { userModules } = require("../modules/user.modules");


const userRoutes=express.Router()
userRoutes.get("/",async(req,res)=>{
    const users=await userModules.find()
    res.send(users)
})
userRoutes.post("/register",async(req,res)=>{
    const{userName,email,pass}=req.body
    try {
        
        bcrypt.hash(pass, 5, async(err, hash)=> {
            if(err){
                res.status(400).send({"error":err})
            }
            else{
                const user=new userModules({email,userName,pass:hash})
                await user.save()
                res.status(200).send({"msg":"The new user has been registered", "registeredUser":user})
            }
        });
       

    } catch (error) {
        res.status(400).send({"error":error})
    }
})
userRoutes.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    try {
        const user= await userModules.findOne({email})
        console.log(user._id ,user.userName )
        if(user){
        bcrypt.compare(pass,user.pass, (err, result)=> {
            // result == true
            if(err){
                res.status(400).send("wrong credential")  
            }
            else{
                const token = jwt.sign({userID:user._id,username:user.userName },"hrutik");
                res.status(200).send({"mag":"login successfully","token":token})
            }
        })
        }
    } catch (error) {
        res.status(400).send(error)
    
    }
})

module.exports={userRoutes}