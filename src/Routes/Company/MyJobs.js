const express = require("express")
const { MyJobsController } = require("../../Controllers/Company/MyJobs")
const myJobsRoute= express.Router()  


myJobsRoute.get('/getMyJobs', MyJobsController)

module.exports={myJobsRoute}