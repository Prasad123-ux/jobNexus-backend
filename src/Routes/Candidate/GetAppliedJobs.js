const express = require("express")
const { getAppliedJobController } = require("../../Controllers/Candidate/GetAppliedJob")
const { candidateAuthenticationMiddleware } = require("../../Middlewares/Candidate/Authentication")
const getAppliedJobsRoute= express.Router() 


getAppliedJobsRoute.post("/getAppliedJobs",candidateAuthenticationMiddleware, getAppliedJobController)


module.exports={getAppliedJobsRoute}