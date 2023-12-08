const jwt=require("jsonwebtoken")


const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
    console.log(req.body)
    if(token){
        jwt.verify(token,"hrutik",(err,decoded)=>{
            if(decoded){
                console.log(decoded)
                req.body.userID
                req.body.userID=decoded.userID
                req.body.username=decoded.username
                next()
            }
            else{
                res.status(403).send({message:"Invalid Token"})
            }
        })
    }
    else{
        res.status(403).send({message:"Invalid Token"})
    }
}
module.exports=auth