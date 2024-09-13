const express= require('express')
const { JobDetailValidation } = require('../../Validators/Company/JobDetail')
const { JobPostingController } = require('../../Controllers/Company/JobPost')
const jobPostingRoute= express.Router()



jobPostingRoute.post('/job_posting', JobDetailValidation, JobPostingController)

module.exports={jobPostingRoute}  