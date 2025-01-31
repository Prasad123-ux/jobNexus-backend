const {JobDetail}= require("../../Modules/HR/JobDetail")

const getCompanyJobsController=async(req, res)=>{ 


    try{
    const { mail }= req.params   
    console.log(mail)
    

    const jobs= await JobDetail.find({CompanyEmail:mail})
    if(!jobs  || jobs.length === 0){

        return res.status(404).json({status:false,message:"Jobs Not Found" })
    }else{
        return res.status(200).json({status:true,message:"Jobs Found" , Data:jobs})
    }
    }catch(err){
        return res.status(500).json({status:false,message:"Internal Server error"})
    }

}

module.exports={getCompanyJobsController}