const {check}=require('express-validator')

const JobDetailValidation=[
    check('jobTitle', "Job Title should not be empty").notEmpty(),
    check('jobDescriptionSummary', 'Job description should be between 10 and 500 characters').isLength({ min: 10, max: 500 }),
    check('jobCommonInfo.*.jobRole', 'Job role should not be empty').notEmpty(),
    check('jobRequirements.*.education', 'Education Requirement is mandatory').notEmpty(),
    check('jobRequirements.*.experience', "Experience should not be empty").notEmpty(),
    check('jobLocation', "enter proper location details").notEmpty(),
    check('jobCommonInfo.*.employmentType', "Employment Type should not be empty").notEmpty(),
    check('jobMinSalary', "Minimum Salary should not be empty").notEmpty(),
    check('jobMaxSalary', "Maximum Salary should not be empty").notEmpty(),
    check('jobApplicationWay', "Please enter application way").notEmpty(),
    check('jobContact.*.HRName', "HR Name should not be empty").notEmpty(),
    check('jobContact.*.HRMobile', "Mobile number should be valid").isMobilePhone(),
    check('jobContact.*.HREmail', "HR Email should be valid").isEmail(),
    // check('jobClosingDate', "Job posting date should be valid").isDate(),
    check('jobCommonInfo.*.jobClosingDate', "Job closing date should be valid").isDate()




]

module.exports={JobDetailValidation}