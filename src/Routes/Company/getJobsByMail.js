const express= require("express")
const { getCompanyJobsController } = require("../../Controllers/Company/getCompanyJobs")
const getJobsByMailRoute= express.Router() 





getJobsByMailRoute.get("/getCompanyJob/:mail", getCompanyJobsController)



module.exports={getJobsByMailRoute}