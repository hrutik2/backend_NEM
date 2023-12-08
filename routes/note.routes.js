const express=require("express");
const { noteModules } = require("../modules/note.modules");
const auth = require("../middleware/auth");
  

const noteRoutes=express.Router()

noteRoutes.get("/",auth,async(req,res)=>{
    try {
        const notes=await noteModules.find({userID:req.body.userID})
        res.status(200).json(notes)
    } catch (error) {
        res.status(400).json(error)
    }
})
noteRoutes.post("/create",auth,async(req,res)=>{
    console.log(req.body)
    try {
        const note=new noteModules(req.body)
        await note.save();
        res.status(201).send('Note created')
    } catch (error) {
        res.status(400).json(error)
    }
})
noteRoutes.patch("/update/:noteID",auth,async(req,res)=>{
    const {noteID}=req.params
    try {
        const note=await noteModules.findOne({_id:noteID})
        if(req.body.userID===note.userID){
            await noteModules.findByIdAndUpdate({_id:noteID},req.body)
            res.status(200).json("updated")
        }
        else{
            res.status(400).json("not autorized")
        }
    } catch (error) {
        res.status(400).json(error)
    }
})
noteRoutes.delete("/delete/:noteID",auth,async(req,res)=>{
    const {noteID}=req.params
    try {
        const note=await noteModules.findOne({_id:noteID})
        if(req.body.userID===note.userID){
            await noteModules.findByIdAndDelete({_id:noteID})
            res.status(200).json("deleted")
        }
        else{
            res.status(400).json("not autorized")
        }
    } catch (error) {
        res.status(400).json(error)
    }
})
module.exports = {noteRoutes}