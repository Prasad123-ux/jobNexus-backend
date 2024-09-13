const { JobDetail } = require("../../Modules/HR/JobDetail")

const getSimilarJobController=(req ,res)=>{
    const  location= req.query.location 
    const role= req.query.role  


    JobDetail.find({$or: [
        { JobLocation: { $regex: new RegExp(location, 'i') } },
        { JobDescription: { $regex: new RegExp(role, 'i') } },
        { JobTitle: { $regex: new RegExp(role, 'i') } }
      ]}).exec()
    .then((user)=>{
        // console.log(user)
        
        if(user!==null){
            res.status(200).json({success:true, message:"Data Fetched Successfully",data:user})
        }else{
            return res.status(404).json({success:false, message:"Data not found"})
        }

    }).catch((err)=>{
        return res.status(500).json({success:false, message:"Error with backend side", err:err.message})

    })
}

module.exports={getSimilarJobController}