const express= require('express')
const { SaveJobsController, SavedJobController } = require('../../Controllers/Candidate/SaveJobs')
const { candidateAuthenticationMiddleware } = require('../../Middlewares/Candidate/Authentication')
const saveJobsRoutes= express.Router() 



saveJobsRoutes.post('/save_job/:id',  candidateAuthenticationMiddleware,SavedJobController)


module.exports={saveJobsRoutes}