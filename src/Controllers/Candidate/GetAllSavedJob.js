const { SavedJob } = require("../../Modules/Candidate/SaveJob")

const GetAllSavedJobsController=(req, res)=>{

    try{
 const allSavedJobs= SavedJob.find({UserEmail:req.email})
 if(!allSavedJobs){
    res.status(404).json({success:false, message:"There is Problem with server"})
 }else{
    res.status(200).json({success:true, message:"Data Accessed", Data:allSavedJobs})
 }

    }
    catch(err){
        res.status(404).json({success:true, message:"Problem with US,  not You !"})

    }
}
module.exports={GetAllSavedJobsController}