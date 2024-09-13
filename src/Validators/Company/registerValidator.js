const {check}=require("express-validator")

const registerValidator=[
    check('CompanyName', 'Company name is required').notEmpty(),
     check('CompanyAddress', 'Company address is required').notEmpty(),
     check('CompanyWebsite', 'Invalid URL format for Company Website').isURL(),
     check('CompanyEmail', 'Invalid Email Address').isEmail(),
     check('CompanyMobile','Invalid Mobile Number').isMobilePhone(),
      check('CompanyDescription', 'Brief Description must be between 10 and 500 characters').isLength({min:10, max:500}),
      check('CompanyIndustry', "Industry is required").notEmpty()   ,
      check('CompanySize', "Company Size must be a positive integer").isInt({gt:0}),
      check('CompanyEstablishmentYear', 'Invalid Year of Establishment').isInt({min:1000, max:new Date().getFullYear()}),
      check('CompanyRegistrationNumber', 'Company Registration Number is required').notEmpty(),
      check('CompanyTIN', 'Company Tax Identification Number(TIN) Number is required').notEmpty(),
      check('CompanyLinkedinProfile', 'Company Linkedin Profile is Required').isURL(),
      check('CompanyTwitterProfile', 'Company Twitter Profile is Required').isURL(),
      check('CompanyFacebookProfile', 'Company Facebook Profile is Required').isURL(),
      check('CompanyOtherProfile', 'Company other Profile is Required').isURL(),
      check('CompanyPassword', "password should be strong").isStrongPassword()




]


module.exports={registerValidator}     