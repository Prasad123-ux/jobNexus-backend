
const express=require("express")
const { updateProfileController } = require("../../Controllers/Company/UpdateProfileData")
const updateCompanyProfileRoute= express.Router()  



updateCompanyProfileRoute.post('/updateCompanyProfileData', updateProfileController)


module.exports={updateCompanyProfileRoute}