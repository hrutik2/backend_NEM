const express=require("express")
const cors=require("cors")
const { userRoutes } = require("./routes/user.routes")
const { connection } = require("./db")
const { noteRoutes } = require("./routes/note.routes")
const app=express()
app.use(express.json())
app.use(cors())
app.use("/users",userRoutes)
app.use("/notes" ,noteRoutes)

app.listen(9999,async()=>{
    await connection;
    console.log("run")
})
// app.listen(2000,async()=>{
//     try {
//         await connection
//         console.log("run")
//     } catch (error) {
//          console.log(error)
//     }
// })