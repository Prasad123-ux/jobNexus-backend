const { validationResult } = require("express-validator")
const { CompanyRegister } = require("../../Modules/HR/Registration")
const bcrypt=require('bcrypt')
const  jwt  = require("jsonwebtoken")
const env= require('dotenv')
env.config()




const companyRegisterController=(req, res)=>{


 const error= validationResult(req)
 if(!error.isEmpty()){
     res.status(403).json({error:error})

 }else{
    CompanyRegister.findOne({CompanyEmail:req.body.CompanyEmail}).exec()
    .then((user)=>{
        if(user!==null){
            res.status(409).json({success:false, message:"User Already Found "})

        }
        else{
            const salt=10 
            bcrypt.hash(req.body.CompanyPassword, salt,(err, result)=>{
                if(err){
                    res.status(400).json({success:false, message:"Please Choose Strong Password"})
                } else if(result){
                    
                    req.body.CompanyPassword=result
               
  



    const companyObject= new CompanyRegister({
    CompanyName:req.body.CompanyName,
    CompanyAddress:req.body.CompanyAddress,
    CompanyWebsite:req.body.CompanyWebsite,
    CompanyEmail:req.body.CompanyEmail,
    CompanyMobile:req.body.CompanyMobile,
    CompanyLogo:req.body.CompanyLogo,
    CompanyDescription:req.body.CompanyDescription,
    CompanyIndustry:req.body.CompanyIndustry,
    CompanySize:req.body.CompanySize,
    CompanyEstablishmentYear:req.body.CompanyEstablishmentYear,
    CompanyRegistrationNumber:req.body.CompanyRegistrationNumber,
    CompanyTIN:req.body.CompanyTIN,
    CompanyBLN:req.body.CompanyBLN,
    CompanyLinkedinProfile:req.body.CompanyLinkedinProfile,
    CompanyTwitterProfile:req.body.CompanyTwitterProfile,
    CompanyFacebookProfile:req.body.CompanyFacebookProfile,
    CompanyOtherProfile:req.body.CompanyOtherProfile,
    CompanyPassword:req.body.CompanyPassword,
    role:req.body.role


    })
    


    companyObject.save().then((user)=>{
        
    


        const token= jwt.sign({email:user.CompanyEmail, role:user.role}, process.env.JWT_TOKEN, {"expiresIn":"30d"})
        console.log(token)
        res.status(200).json({success:true, Message:"Data saved Successfully", token:token})
        

    }).catch((e)=>{
        res.status(500).json({success:false, Message:"Internal Server Error: Unable to save user data. Please try again later.", error:e})

    })
}else{
    res.status(404).json({success:false, message:"validation error"})
}
})




}
}).catch((err)=>{
    res.status(403).json({success:false, message:"Problem with registration ", err:err})


})

}
}

module.exports={companyRegisterController}
