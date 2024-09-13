
const jwt= require('jsonwebtoken')
const env= require('dotenv')
env.config()

const companyAuthenticateMiddleware=(req, res, next)=>{

    const token=req.body.token  

    if(token=="undefined"){
        res.status(200).json({success:false, message:"Please Login first"})
    }else{
        const decoded= jwt.verify(token, process.env.JWT_TOKEN)
        req.email= decoded.email
        req.role=decoded.role

        if(req.role==="Company"){
            next()
        }else{
            res.status(404).json({ success:false, message:"Unauthorised", })
        }
    }

}
module.exports={companyAuthenticateMiddleware}