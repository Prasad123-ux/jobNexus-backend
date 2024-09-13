const express = require('express') 
const { candidateAuthenticationMiddleware } = require('../../Middlewares/Candidate/Authentication')
const { SaveJobsController } = require('../../Controllers/Candidate/SaveJobs')
const { saveResumeController } = require('../../Controllers/Candidate/SaveResume')
const updateResume= express.Router()  



updateResume.post('/add_resume', candidateAuthenticationMiddleware, saveResumeController)


module.exports={updateResume}