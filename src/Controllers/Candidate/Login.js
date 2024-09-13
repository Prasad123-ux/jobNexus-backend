const { JobSeekerDetail } = require("../../Modules/Candidate/JobSeekers")
const bcrypt= require('bcrypt')
const env= require('dotenv')
const { validationResult } = require("express-validator")
env.config()
const jwt= require('jsonwebtoken')

const CandidateLoginController=((req,res)=>{
    console.log(req.body)
   
const data= req.body.data
console.log(data)

const error= validationResult(req)
if(!error.isEmpty()){
    res.status(403).json({success:false, message:"Data Format is Wrong",error:error.errors[0].msg})    
}else{
    JobSeekerDetail.findOne({Email:data.email}).exec()
    .then((user)=>{
        if(user!==null){
            bcrypt.compare(data.password, user.Password)
            .then((value)=>{
                if(value==true){
                    const token= jwt.sign({email:user.Email, role:user.role}, process.env.JWT_TOKEN,{expiresIn:"30d"})
                    res.status(200).json({success:true, message:"Login Successfully", token:token})
                    
    
                }else{
                    res.status(404).json({success:false, message:"Authentication Error"})
                }
            }).catch((err)=>{
                res.status(404).json({success:false,message:"Authentication Error"})
    
    
            })
    
    
        }else{
            res.status(404).json({success:false,message:"User Not Found "})
        }
    
    }).catch((err)=>{
        res.status(404).json({success:false, message:"User Problem Exist", err:err})
    })
    
    
}

})

module.exports={CandidateLoginController}