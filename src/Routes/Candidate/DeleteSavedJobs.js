const express= require('express')
const { candidateAuthenticationMiddleware } = require('../../Middlewares/Candidate/Authentication')
const deleteSavedJobRoute=express.Router()   



deleteSavedJobRoute.post('/delete_Saved_job', candidateAuthenticationMiddleware, deleteSavedJobRoute)


module.exports={deleteSavedJobRoute}