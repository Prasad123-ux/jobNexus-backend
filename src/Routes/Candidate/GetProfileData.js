const express = require('express')
const { getProfileDataController } = require('../../Controllers/Candidate/GetProfileData')
const { candidateAuthenticationMiddleware } = require('../../Middlewares/Candidate/Authentication')
const getProfileDataRoute= express.Router()



getProfileDataRoute.post('/getProfileData' ,candidateAuthenticationMiddleware, getProfileDataController)


module.exports={getProfileDataRoute}