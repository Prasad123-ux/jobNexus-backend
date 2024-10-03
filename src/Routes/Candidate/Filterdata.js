const express= require('express')
const { filterDataController } = require('../../Controllers/Candidate/FilterData')
const filterRoute= express.Router()  


filterRoute.get('/filterData', filterDataController) 


module.exports={filterRoute}



