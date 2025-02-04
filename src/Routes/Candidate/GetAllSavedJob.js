const express= require('express')
const { GetAllSavedJobsController } = require('../../Controllers/Candidate/GetAllSavedJob')
const { candidateAuthenticationMiddleware } = require('../../Middlewares/Candidate/Authentication')
const GetAllSavedJobsRoute= express.Router() 



GetAllSavedJobsRoute.post('/savedJobs',  candidateAuthenticationMiddleware,  GetAllSavedJobsController)


module.exports={GetAllSavedJobsRoute}