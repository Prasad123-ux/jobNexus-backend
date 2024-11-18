const express = require('express') 
const { candidateAuthenticationMiddleware } = require('../../Middlewares/Candidate/Authentication')
const { SaveJobsController } = require('../../Controllers/Candidate/SaveJobs')
const { saveResumeController } = require('../../Controllers/Candidate/SaveResume')
const { resumeAuthenticationMiddleware } = require('../../Middlewares/Candidate/resumeMiddleware')
const updateResume= express.Router()  



updateResume.post('/add_resume',resumeAuthenticationMiddleware, saveResumeController)


module.exports={updateResume}