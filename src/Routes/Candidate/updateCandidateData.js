const express=require("express") 
const { updateCandidateData } = require("../../Controllers/Candidate/UpdateData")
const updateCandidateRoute= express.Router() 



updateCandidateRoute.post('/updateProfileDetail',updateCandidateData)  

module.exports={updateCandidateRoute}