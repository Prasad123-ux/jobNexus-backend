const express = require("express")
const { followCompanyController } = require("../../Controllers/Candidate/FollowCompany")
const { candidateAuthenticationMiddleware } = require("../../Middlewares/Candidate/Authentication")
 const followCompanyRouter= express.Router() 


followCompanyRouter.post('/companyProfile/followaction', candidateAuthenticationMiddleware, followCompanyController) 


module.exports={followCompanyRouter}