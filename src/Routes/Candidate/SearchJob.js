const express= require("express")
const { searchJobController } = require("../../Controllers/Candidate/SearchjobController")
const searchRoute=   express.Router()  



searchRoute.get('/searchData',searchJobController ) 


module.exports={searchRoute}