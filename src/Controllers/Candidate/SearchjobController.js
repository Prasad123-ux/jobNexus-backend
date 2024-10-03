const {JobDetail}= require("../../Modules/HR/JobDetail")

const searchJobController=async (req ,res)=>{ 
    try{
    const {location, role}= req.query;   
    const finalResult=[]

    console.log(location, role)
    if(!location && ! role ){
        return res.status(400).json({success:false,message:"please provide a location and role to search"})
    }

    const data = await  JobDetail.find({$or:[{Location:location}, {role :role}]})    

      if(data && data.length>0){
    finalResult.push(data)
     }

    if(data.length===0){
        return res.status(400).json({ success:false, message:"Data Not Found" })
    }
        return res.status(200).json({success:true, message:"Data Found", job:finalResult})
    
}catch(err){ 
    return res.status(500).json({success:false, message:"Internal server Error"})

}
}

module.exports={searchJobController}