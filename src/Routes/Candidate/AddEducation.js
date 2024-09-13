const express = require("express")  
const { addNewEducationController } = require("../../Controllers/Candidate/AddEducation")
const { candidateAuthenticationMiddleware } = require("../../Middlewares/Candidate/Authentication")
const AddEducationRouter= express.Router()  



AddEducationRouter.post('/addProfileDetail',candidateAuthenticationMiddleware, addNewEducationController)


module.exports={AddEducationRouter}