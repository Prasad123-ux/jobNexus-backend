const express= require("express")
const { getSimilarJobController } = require("../../Controllers/Candidate/SmilarJob")
const getSimilarJobRoute=express.Router()



getSimilarJobRoute.get('/getSimilarJob', getSimilarJobController)


module.exports={getSimilarJobRoute}
