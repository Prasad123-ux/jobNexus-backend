const express= require('express')
const { GetAllSavedJobsController } = require('../../Controllers/Candidate/GetAllSavedJob')
const { candidateAuthenticationMiddleware } = require('../../Middlewares/Candidate/Authentication')
const GetAllSavedJobsRoute= express.Router() 



GetAllSavedJobsRoute.get('/get_all_saved_jobs',  candidateAuthenticationMiddleware,  GetAllSavedJobsController)


module.exports={GetAllSavedJobsRoute}