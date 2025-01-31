const express= require('express')
const { candidateAuthenticationMiddleware } = require('../../Middlewares/Candidate/Authentication')
const { AppliedJobsController } = require('../../Controllers/Candidate/JobApplied')
const AppliedJobRoute= express.Router() 



AppliedJobRoute.post('/appliedForJob/:id',candidateAuthenticationMiddleware,AppliedJobsController)

module.exports={AppliedJobRoute}