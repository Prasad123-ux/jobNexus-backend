const { CompanyRegister } = require("../../Modules/HR/Registration")
const bcrypt= require('bcrypt')
const { validationResult } = require("express-validator")
const jwt= require('jsonwebtoken')
const env= require('dotenv')
env.config()



const companyLoginController=(req, res)=>{
    
    const error= validationResult(req)
    if(!error.isEmpty()){
        res.status(403).json({success:false, message:"problem with entering data", error:error})
    }
    else{
        console.log(req.body)
    CompanyRegister.findOne({CompanyEmail:req.body.companyEmail}).exec() 
    .then((user)=>{
        // console.log(user)
        if(user==null){
            res.status(404).json({success:false, message:"user not found"})
        }else{
            salt=10
            console.log(req.body.companyPassword)
            console.log(user.CompanyPassword)
             bcrypt.compare(req.body.companyPassword, user.CompanyPassword)
            .then((value)=>{
                if(value==true){
                    const token= jwt.sign({email:user.CompanyEmail,role:user.role}, process.env.JWT_TOKEN,{expiresIn:"30d"}) 
                         res.status(200).json({success:true, message:"Login Successfully", token:token})
                }
                else{
                    res.status(404).json({success:false, message:"User not found error in comparing password",err:err})

                }

            }).catch((err)=>{
                                     res.status(404).json({success:false, message:"User not found error in comparing password",err:err})


            })

            // bcrypt.compare(req.body.companyPassword, user.CompanyPassword,(err, result)=>{
            //     if(err){
            //         res.status(404).json({success:false, message:"User not found error in comparing password",err:err})
            //     }
            //     else  {
            //         const token= jwt.sign({email:user.CompanyEmail,role:user.role}, process.env.JWT_TOKEN,{expiresIn:"30d"}) 
            //         res.status(200).json({success:true, message:"Login Successfully", token:token})
            //     }
              
            //     // if(err){
            //     //     res.status(404).json({success:false, message:"User not found",err:err})
            //     // }else{
            //     //     if(result){
            //     //         const token= jwt.sign({email:user.CompanyEmail,role:user.role}, process.env.JWT_TOKEN,{expiresIn:"30d"}) 
            //     //         // const token= jwt.sign({email:user.CompanyEmail, role:user.role}, process.env.JWT_TOKEN, {"expiresIn":"30d"})

            //     //         res.status(200).json({success:true, message:"Login Successfully", token:token})
            //     //     }else{
            //     //         res.status(401).json({success:false, message:"Incorrect Password"})
            //     //     }
            //     // }
            // })
            
        }

    }).catch((err)=>{
        res.status(404).json({success:false, message:"Problem with finding user", err:err})
    })
    }
}

module.exports={companyLoginController}