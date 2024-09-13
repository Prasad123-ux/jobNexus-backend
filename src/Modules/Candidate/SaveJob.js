const { mongoose } = require("../../Config/db");

const SaveJobSchema= new mongoose.Schema({
    UserEmail:{
        type:String,
         required:true
    },
    JobID:{
        type:String,
        required:String
    }
}, {timestamps:true})

const SavedJob= mongoose.model('SavedJob', SaveJobSchema)


module.exports={SavedJob}
