const {CompanyRegister}=require("../../Modules/HR/Registration") 

const getAllCompaniesController=async (req, res)=>{



    try{


    const allCompanies= await CompanyRegister.find().exec()
    if(!allCompanies || allCompanies.length === 0){
   return  res.status(404).json({success:false, message:"No jobs Found"})
    }
    else{
        return  res.status(200).json({success:true, message:"jobs Found" ,data:allCompanies})
    }
}catch(err){ 
    return  res.status(500).json({success:false, message:"Internal Server Error", error:err.message })

}
}

module.exports={getAllCompaniesController}