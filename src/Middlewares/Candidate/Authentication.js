
const jwt= require('jsonwebtoken')


const candidateAuthenticationMiddleware=(req, res, next)=>{
    const token= req.body.token 

    if(token=="undefined"){
        res.status(404).json({success:true,message:"Please Register Yourself"})

    }else{
        const decoded= jwt.verify(token, process.env.JWT_TOKEN)
        req.email= decoded.email
        req.role= decoded.role

        if(req.role=="candidate"){
            console.log("token verified")
            next()
        }else{
            res.status(404).json({success:true,message:"Unauthorized"})

        }

    }
}

module.exports={candidateAuthenticationMiddleware}