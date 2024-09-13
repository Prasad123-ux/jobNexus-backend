const express= require('express')
const { getForgetOtp } = require('../../Controllers/Candidate/getForgetEmail')
const getOtp= express.Router() 



getOtp.post('/forgetPassword',getForgetOtp)


module.exports={getOtp}