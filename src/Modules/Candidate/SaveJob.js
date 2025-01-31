const { mongoose } = require("../../Config/db");

const SaveJobSchema= new mongoose.Schema({

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

    
}, {timestamps:true})

const SavedJob= mongoose.model('SavedJob', SaveJobSchema)


module.exports={SavedJob}
