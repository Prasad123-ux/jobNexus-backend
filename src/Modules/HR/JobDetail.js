const { mongoose } = require("../../Config/db");

const jobSchema=  mongoose.Schema({
  JobCompany:String,
    JobTitle: String,
  JobDescriptionSummary: String,
  JobKeyResponsibilities: String,
  CompanyEmail: String,
  JobLocation: String,
  JobMinSalary: Number,
  JobMaxSalary: Number,
  JobMinExperience: Number,
  JobMaxExperience: Number,
  JobApplicationWay: String,
  JobRequirements: [
    {
      EducationalRequirement: String,
      Experience: String,
      NeededSkillsAndTechnologies: String,
      TravelRequirements: String,
      RequiredDocuments: String,
      IsRemoteWorkOption: Boolean, // Consider using Boolean if the data represents true/false
    }
  ],
  JobCommonInfo: [
    {
      JobRole: String,
      EmploymentType: String,
      JobBenefits: String,
      JobDepartment: String,
      WorkingHours: String,
      OfficeCulture: String,
      BenefitsOffered: String,
      PerformanceBonuses: String,
      JobClosingDate: String, // Consider using Date type
      JobCertification: String,
      AdditionalSkillsMandatory: String,
    }
  ],
  JobContact: [
    {
      HRName: String,
      HRMobile: Number,
      HREmail: String
    }
  ]
  
   

}, {timestamps:true})

const JobDetail=mongoose.model('JobDetail', jobSchema)

module.exports={JobDetail}