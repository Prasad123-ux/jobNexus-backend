const express= require('express')
const { loginValidation } = require('../../Validators/Company/Login')
const { companyLoginController } = require('../../Controllers/Company/Login')
const companyLoginRoute=express.Router() 



companyLoginRoute.post('/login_company', loginValidation, companyLoginController)


module.exports={companyLoginRoute}