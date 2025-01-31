const { CompanyRegister } = require("../../Modules/HR/Registration")


const profileDataController=(req, res)=>{

    // console.log(req.body.email)
    const {id}= req.params
    console.log(id)
    


    CompanyRegister.findOne({_id:id}).exec()
    .then((user)=>{
        
        if(user!==null){
            res.status(200).json({success:true, message:"Company Data Found", Data:user})


        }else{
            res.status(404).json({success:false, message:"Sorry ! Company Data not found"})

        }

    }).catch((err)=>{
        res.status(404).json({success:false, message:"Internal Server error", error:err.message})


    })

}

module.exports={profileDataController}