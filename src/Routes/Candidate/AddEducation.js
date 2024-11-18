const express = require("express")  
const {  addNewProfileController } = require("../../Controllers/Candidate/AddEducation")
const { candidateAuthenticationMiddleware } = require("../../Middlewares/Candidate/Authentication")
const AddEducationRouter= express.Router()  



AddEducationRouter.post('/addProfileDetail',candidateAuthenticationMiddleware, addNewProfileController)


module.exports={AddEducationRouter}   