const { mongoose } = require("../../Config/db");

const ApplyJobSchema= new mongoose.Schema({
    UserEmail:{
        type:String,
         
    },
    JobID:{
        type:String,
        required:String
    }
}, {timestamps:true})

const AppliedJobData= mongoose.model('AppliedJobData', ApplyJobSchema)


module.exports={AppliedJobData}
