const express= require('express') 
const { getAllCompaniesController } = require('../../Controllers/Company/AllCompanies')
const getAllCompaniesRoute= express.Router()



getAllCompaniesRoute.get('/getAllCompanies', getAllCompaniesController) 


module.exports={getAllCompaniesRoute}