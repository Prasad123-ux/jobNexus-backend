const express= require('express')
const { loginCandidateValidation } = require('../../Validators/Candidate/Login')
const { CandidateLoginController } = require('../../Controllers/Candidate/Login')
const loginCandidateRoute= express.Router() 




loginCandidateRoute.post('/loginCandidate', loginCandidateValidation, CandidateLoginController)


module.exports={loginCandidateRoute}