const express= require('express')
const { getAllJobsController } = require('../../Controllers/Candidate/GetJobs')
const getAllJobsRoutes=express.Router()



getAllJobsRoutes.get('/getAllJobs', getAllJobsController)


module.exports={getAllJobsRoutes}