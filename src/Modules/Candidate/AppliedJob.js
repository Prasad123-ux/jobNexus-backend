const { mongoose } = require("../../Config/db");

const ApplyJobSchema= new mongoose.Schema({
    UserEmail:{
        type:String,
         
    },
    JobID:{
        type:String,
        required:String
    },
    
    JobTitle:{type:String},
    CompanyName:{type:String},
    Location:{type:String },
    Status:{type:String}
}, {timestamps:true})

const AppliedJobData= mongoose.model('AppliedJobData', ApplyJobSchema)


module.exports={AppliedJobData}
