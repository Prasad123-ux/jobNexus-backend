const { handleArchiveController } = require("../../Controllers/Candidate/handleArchieve")
// const { candidateAuthenticationMiddleware } = require("../../Middlewares/Candidate/Authentication")

const express= require("express")
const { candidateAuthenticationMiddleware } = require("../../Middlewares/Candidate/Authentication")

const archiveRoute= express.Router()  



archiveRoute.delete("/getAppliedJobs/handlearchieve/:id", candidateAuthenticationMiddleware  , handleArchiveController)  


module.exports={archiveRoute}