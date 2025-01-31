// const { SavedJob } = require("../../Modules/Candidate/SaveJob")
const { AppliedJobData } = require("../../Modules/Candidate/AppliedJob")
const { SavedJob } = require("../../Modules/Candidate/SaveJob")
const { JobDetail } = require("../../Modules/HR/JobDetail")

const SavedJobController= async (req, res)=>{


    const jobID= req.params.id
  console.log(jobID)
    
    
    if (!jobID) {
        return res.status(400).json({ success: false, message: "Job ID is missing" });
    }

    const job= await SavedJob.findOne({JobID:jobID,UserEmail:req.email})
    console.log(job)
    
    if(job){
       return  res.status(404).json({message:"Job Already Saved"})
    }else{
        const applyJobObject= new SavedJob ({
            UserEmail:req.email,
            JobID:jobID  ,
            JobTitle:req.body.JobTitle,
            CompanyName:req.body.companyName,
            Status:"Applied"

        })
        applyJobObject.save().then(()=>{
            res.status(200).json({success:true, message:"Job Saved Successfully"})

        })
        .catch((err)=>{
            res.status(404).json({success:false, message:"Internal Server Error", err:err.message})

        })


    }
}

module.exports={SavedJobController}      