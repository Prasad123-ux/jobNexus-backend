const { JobSeekerDetail } = require("../../Modules/Candidate/JobSeekers")
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')
const env= require('dotenv')
const { validationResult } = require("express-validator")
env.config()


const RegisterCandidateController=(req, res)=>{
    // console.log(req.body.projects[0].title)
    console.log(req.body)
const userData= req.body.userData
console.log(userData.password)
const error= validationResult(req)

if(!error.isEmpty()){
   return   res.status(400).json({success:false, message:"validation error", error:error.errors[0].msg})
}else{
   

    JobSeekerDetail.findOne({Email:userData.email}).exec()
    .then((user)=>{
        //  console.log(user)     
        if(user!==null){

           return  res.status(400).json({success:false, message:"user already found"})
        }else{
            

        
            const salt=10
            bcrypt.hash(userData.password, salt,(err, result)=>{
                if(err){
                    return  res.status(400).json({success:false, message:"ohh1 there is some error", error:err.message})
                }else if(result){
                    userData.password= result 
                    // console.log(req.body.password)


                    const candidateObject=new JobSeekerDetail({
                    FullName:userData.fullName,
                    Email:userData.email,
                    Password:userData.password,
                    WorkStatus:userData.workStatus,
                    City:userData.city,
                    MobileNumber:userData.mobileNumber
                   
                       
                      
                       
                        })
                       
                        candidateObject.save().then((user)=>{
                            //  console.log(user)
                            const token= jwt.sign({email:user.Email, role:user.role},process.env.JWT_TOKEN, {"expiresIn":"30d"}) 
                            // res.cookie('authToken', token, {
                            //     httpOnly:true,
                            //     secure:true, 
                            //     sameSite:'Strict',
                            //     maxAge:24*60*60*1000
                            // })
                            res.status(200).json({success:true, message:"Data saved", token:token})
                        }).catch((err)=>{
                            console.log(err.message)
                          return   res.status(404).json({success:true, message:"Problem with data saving" , error:err.message})

                        })


                }else{
                   return   res.status(404).json({success:false, message:"there is some problem "})
                }

            } )
        

        }

    })
}
}

module.exports={RegisterCandidateController}