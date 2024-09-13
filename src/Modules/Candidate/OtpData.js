const { mongoose } = require("../../Config/db");


const otpSchema=new mongoose.Schema({
    userEmail:{
        type:String,
        required:true
    },
    otp:{
        type:Number,
        required:true
    },
    otpExpiration:{
        type:Date,
        required:true
    }
})

const OTP= mongoose.model('OTP',otpSchema)


module.exports={OTP}