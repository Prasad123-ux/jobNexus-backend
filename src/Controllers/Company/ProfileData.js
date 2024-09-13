const { CompanyRegister } = require("../../Modules/HR/Registration")


const profileDataController=(req, res)=>{

    // console.log(req.body.email)
    const email= req.body.email
    

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

    CompanyRegister.findOne({CompanyEmail:req.body.email}).exec()
    .then((user)=>{
        
        if(user!==null){
            res.status(200).json({success:true, message:"User Found", Data:user})


        }else{
            res.status(404).json({success:false, message:"Sorry ! user not found"})

        }

    }).catch((err)=>{
        res.status(404).json({success:false, message:"Sorry ! user not found", error:err})


    })

}

module.exports={profileDataController}