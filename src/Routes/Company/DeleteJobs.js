
const express =require('express')
const { deleteJobsController } = require('../../Controllers/Company/DeleteJobs')
const deleteJobRoute= express.Router()


deleteJobRoute.delete('/deleteJob/:id', deleteJobsController)



module.exports={deleteJobRoute}