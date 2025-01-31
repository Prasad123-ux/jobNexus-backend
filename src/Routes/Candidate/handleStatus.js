const   express =require("express")
// const { candidateAuthenticationMiddleware } = require("../../Middlewares/Candidate/Authentication")
const {candidateAuthenticationMiddleware}= require("../../Middlewares/Candidate/Authentication")
const { handleApplicationStatusController } = require("../../Controllers/Candidate/HandleApplicationStatus")
// const { default: HandleApplicationStatus } = require("../../Controllers/Candidate/HandleApplicationStatus")
// const { default: HandleApplicationStatus } = require("./HandleApplicationStatus")
const handleStatusRoute=express.Router() 




handleStatusRoute.patch("/getAppliedJobs/updateStatus/:id",candidateAuthenticationMiddleware,handleApplicationStatusController)  


module.exports={handleStatusRoute}