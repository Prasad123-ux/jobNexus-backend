const express= require('express')
const { companyRegisterController } = require('../../Controllers/Company/RegisterController')
const { registerValidator } = require('../../Validators/Company/registerValidator')
// const { registerValidator } = require('../../Validators/Company/registerValidator')
const companyRegisterRoute=express.Router()



companyRegisterRoute.post('/register_company' ,registerValidator ,companyRegisterController)



module.exports={companyRegisterRoute}