const { JobDetail } = require("../../Modules/HR/JobDetail")

const deleteJobsController=(req, res)=>{
    

    JobDetail.findByIdAndDelete({_id:req.params.id}).exec()
    .then(()=>{
        res.status(200).json({success:true, message:"job deleted"})
    }).catch((err)=>{
        res.status(400).json({success:false, message:"jobs not deleted", err:err})
    })
}

module.exports={deleteJobsController}