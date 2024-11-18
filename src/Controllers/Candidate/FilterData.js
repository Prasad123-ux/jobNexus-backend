const { JobDetail } = require("../../Modules/HR/JobDetail")

const filterDataController=async (req ,res)=>{ 


    

const data = req.query

 try{  

    let finalResult=[] 


    for (const [key, value] of Object.entries(data)){
        let queryValue= Array.isArray(value) ? value:[value]  

        const result= await JobDetail.find({[key]:{$in:queryValue}}) ; 
     console.log(result)
        if(result && result.length >0){
            finalResult.push(result)
        }
    }


    if(finalResult.length === 0) {
        return res.status(400).json({ success: false, message: "Data not found" });
    } 
    return res.status(200).json({success:true, message:"Data Found" , jobs:finalResult})

}catch(err){
    return res.status(500).json({success:false, message:"Internal Server Error"})

}





}
module.exports={filterDataController}