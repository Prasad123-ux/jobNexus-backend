const { SavedJob } = require("../../Modules/Candidate/SaveJob")

const DeleteSavedJobsController=async (req, res)=>{

jobID= req.body.jobID 

 const deleteSavedJob = await SavedJob.findByIdAndDelete()

 if(!deleteSavedJob){
    res.status(404).json({success:false, message:"Job Not Found"})
 }else{
    res.status(200).json({success:true, message:"Job Deleted"})
 }
}


module.exports={DeleteSavedJobsController}   
      
module.exports={DeleteSavedJobsController}   


