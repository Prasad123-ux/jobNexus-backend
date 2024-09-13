


const { JobSeekerDetail } = require("../../Modules/Candidate/JobSeekers")

const getProfileDataController= async (req, res)=>{

    try{
  const candidateData= await JobSeekerDetail.findOne({Email:req.email}) 

   if(!candidateData){
    return  res.status(404).json({success:false, message:"Data Not Found for this Account"})
   }
   else{
    return  res.status(200).json({success:true, message:"Data Found", Data:candidateData})
   }

    }
    catch(err){
       return   res.status(500).json({success:false, message:"Data Not Found", err:err})

    }




}


module.exports={getProfileDataController}