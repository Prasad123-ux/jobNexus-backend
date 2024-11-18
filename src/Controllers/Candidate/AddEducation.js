const { JobSeekerDetail } = require("../../Modules/Candidate/JobSeekers");

const addNewProfileController= (req, res)=>{
     const dataType= req.body.dataType
     const email= req.email;  
     const data = req.body.data
    console.log(req.body)
     console.log(dataType) 

    const fieldToUpdate=`extraFields.${dataType}`;
    const isDataArray=Array.isArray(data)
    
    const updateOperation = isDataArray  ? { $push: { [fieldToUpdate]: {$each:data} } }:{$push:{[fieldToUpdate]:data}};


 

        JobSeekerDetail.findOneAndUpdate(
            {Email:email}, 
        
        
updateOperation,
           
         
         {
            new:true, upsert:true
        }) .exec()  
        .then((user)=>{
            if(!user){
                return res.status(400).json({success:false, message:"Data not saved"})
            }else{
                return res.status(200).json({success:true, message:" Data Saved"})

            }

        }).catch((err)=>{ 
            return res.status(500).json({success:false, message:"Internal Server Error", error:err.message})

        })
}

module.exports={addNewProfileController}