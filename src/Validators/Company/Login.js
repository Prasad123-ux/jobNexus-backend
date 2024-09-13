const {check}= require('express-validator') 


const loginValidation=[
    check('companyEmail', "Email Should be Valid").isEmail(),
    check('companyName', "Company Name should not be Empty").notEmpty(),
    // check('companyPassword',"Password Should be valid").isStrongPassword()
]

module.exports={loginValidation}