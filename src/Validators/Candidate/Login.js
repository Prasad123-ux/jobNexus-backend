const {check}= require('express-validator')

const loginCandidateValidation=[
    check("data.email", "Please Enter Valid Email").isEmail(),
    check("data.password", "Please Enter Strong Password").isStrongPassword()
]

module.exports={loginCandidateValidation}




