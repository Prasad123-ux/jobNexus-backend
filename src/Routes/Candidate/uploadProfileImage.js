const express= require("express") 
const { uploadProfileImageController } = require("../../Controllers/Candidate/UploadProfileImage")
const { resumeAuthenticationMiddleware } = require("../../Middlewares/Candidate/resumeMiddleware")
const uploadProfileImageRoute=express.Router() 

uploadProfileImageRoute.post('/uploadProfileImage',resumeAuthenticationMiddleware, uploadProfileImageController) 


module.exports={uploadProfileImageRoute}
