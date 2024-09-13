const express= require('express')
const { RegisterCandidateController } = require('../../Controllers/Candidate/RegisterCandidate')
const { registerCandidateValidator } = require('../../Validators/Candidate/RegisterCandidate')
const registerCandidateRoute= express.Router()  





registerCandidateRoute.post('/registerCandidate',registerCandidateValidator, RegisterCandidateController)


module.exports={registerCandidateRoute}