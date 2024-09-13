const {check}= require('express-validator')

const registerCandidateValidator=[
    check('userData.fullName', 'fullName should not be empty').notEmpty(),
    // check('lastName', "LastName should not be empty").notEmpty(),
    // check('dateOfBirth', "Date of Birth should be valid").notEmpty(),
    // check('gender', 'Gender should not be empty').notEmpty(),
    check('userData.email', "Email should be valid").isEmail(),
    check('userData.password', "Password should be string").isStrongPassword(),
    check('userData.mobileNumber', "Enter Valid Mobile Number").isMobilePhone()

]

module.exports={registerCandidateValidator}