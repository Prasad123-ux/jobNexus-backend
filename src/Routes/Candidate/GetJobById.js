const express = require('express')
const { getAllJobsController } = require('../../Controllers/Candidate/GetJobs')
const { getJobByIDController } = require('../../Controllers/Candidate/GetJobByID')
const getJobByIDRoute= express.Router() 




getJobByIDRoute.get('/getJobByID/:id', getJobByIDController)


module.exports={getJobByIDRoute}