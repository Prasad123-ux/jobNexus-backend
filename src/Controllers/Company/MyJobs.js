const { JobDetail } = require("../../Modules/HR/JobDetail")



const MyJobsController=(req, res)=>{


    req.body() 

    JobDetail.find({CompanyEmail:req.email}).exec()
    .then((user)=>{
        if(user!==null){
            res.status(200).json({success:true, message:"Data found", Data:user})

        }else{
            res.status(404).json({success:true,message:"Data not found" })
        }

    }).catch((err)=>{
        res.status(200).json({success:false, message:err})
        
    })


}

module.exports={MyJobsController}