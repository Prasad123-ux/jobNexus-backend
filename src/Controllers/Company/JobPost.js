const { validationResult } = require("express-validator")
const { JobDetail } = require("../../Modules/HR/JobDetail")
const { CompanyRegister } = require("../../Modules/HR/Registration")
const { JobDetailValidation } = require("../../Validators/Company/JobDetail")

const JobPostingController=(req, res)=>{
    // console.log(req.body)
    req.body.jobRequirements.map(value=>{
        console.log(value)
    })
    req.body.jobCommonInfo.map(value1=>{

        console.log(value1)
    })
    req.body.jobContact.map(value2=>{
        console.log(value2)
    })

const error= validationResult(req) 
if(!error.isEmpty()){
    res.status(404).json({success:false, message:"Problem with Data validation" , error:error})
}else{

   CompanyRegister.findOne({CompanyEmail:req.body.email}).exec()
   .then((user)=>{
    console.log(user)
    if(user!==null){
        const jobDetailObject= new JobDetail({
            JobCompany:req.body.companyName,
            JobTitle: req.body.jobTitle,
  JobDescriptionSummary: req.body.jobDescriptionSummary,
  JobKeyResponsibilities: req.body.jobKeyResponsibilities,
  CompanyEmail: req.body.email,
  JobLocation: req.body.jobLocation,
  JobMinSalary: req.body.jobMinSalary,
  JobMaxSalary: req.body.jobMaxSalary,
  JobMinExperience: req.body.jobMinExperience,
  JobMaxExperience: req.body.jobMaxExperience,
  JobApplicationWay: req.body.jobApplicationWay,

  JobRequirements:Array.isArray(req.body.jobRequirements) ? req.body.jobRequirements.map(requirements => ({
    EducationalRequirement: requirements.education,
    Experience: requirements.experience,
    NeededSkillsAndTechnologies: requirements.neededSkillsAndTechnologies,
    TravelRequirements: requirements.travelRequirements,
    RequiredDocuments: requirements.requiredDocuments,
    IsRemoteWorkOption: requirements.remoteWorkOption
  })):[],
  JobCommonInfo:  Array.isArray( req.body.jobCommonInfo) ? req.body.jobCommonInfo.map(info => ({
    JobRole: info.jobRole,
    EmploymentType: info.employmentType,
    JobBenefits: info.jobBenefits,
    JobDepartment: info.jobDepartment,
    WorkingHours: info.workingHours,
    OfficeCulture: info.officeCulture,
    BenefitsOffered: info.benefitsOffered,
    PerformanceBonuses: info.performanceBonuses,
    JobClosingDate: info.jobClosingDate,
    JobCertification: info.jobCertification,
    AdditionalSkillsMandatory: info.additionalSkillsMandatory
  })):[],
  JobContact: Array.isArray(req.body.jobContact) ? req.body.jobContact.map(contact => ({
    HRName: contact.HRName,
    HRMobile: contact.HRMobile,
    HREmail: contact.HREmail
  })):[]
        })
        jobDetailObject.save().then((user)=>{
        
            res.status(200).json({success:true, message:"Data saved successfully"})
         
        }).catch((err)=>{
            res.status(404).json({success:false, message:"Data not saved", error:err})

        })

    }else{
        res.status(404).json("Problem with Login credentials Please check your company detail")
    }

   }).catch((err)=>{
    res.status(500).json({success:false, message:"Job Could not registered. Please try again !", error:err.message})

   })
}

}

module.exports={JobPostingController}