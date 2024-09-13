const express= require('express')
const app= express()
const env= require('dotenv')
const cors = require("cors")
env.config() 
const bodyParser= require('body-parser')


const { companyRegisterRoute } = require('./src/Routes/Company/registerRoutes')

const { companyLoginRoute } = require('./src/Routes/Company/Login')
const { profileDataRoute } = require('./src/Routes/Company/ProfileData')
const { updateCompanyProfileRoute } = require('./src/Routes/Company/UpdateProfileData')
const { jobPostingRoute } = require('./src/Routes/Company/JobPosting')
const { myJobsRoute } = require('./src/Routes/Company/MyJobs')
const { deleteJobRoute } = require('./src/Routes/Company/DeleteJobs')
const { getAllJobsRoutes } = require('./src/Routes/Candidate/GetAllJobs')
const { getJobByIDRoute } = require('./src/Routes/Candidate/GetJobById')
const { registerCandidateRoute } = require('./src/Routes/Candidate/RegisterCadidate')
const { loginCandidateRoute } = require('./src/Routes/Candidate/Login')
const { updateDataRoute } = require('./src/Routes/Candidate/update')
const { getProfileDataRoute } = require('./src/Routes/Candidate/GetProfileData')
const { saveJobsRoutes } = require('./src/Routes/Candidate/SaveJobs')
const { GetAllSavedJobsRoute } = require('./src/Routes/Candidate/GetAllSavedJob')
const { getSimilarJobRoute } = require('./src/Routes/Candidate/SimilarJob')
const { AppliedJobRoute } = require('./src/Routes/Candidate/AppliedJob')
const { getOtp } = require('./src/Routes/Candidate/getOtp')
const { googleRouter } = require('./src/Routes/Candidate/getMailApi')
const { updateResume } = require('./src/Routes/Candidate/SaveResume')
const { AddEducationRouter } = require('./src/Routes/Candidate/AddEducation')




app.use(bodyParser.json())
app.use(cors())



app.use('/api/company', companyRegisterRoute)
app.use('/api/company', companyLoginRoute)
app.use('/api/company', profileDataRoute)
app.use('/api/company', updateCompanyProfileRoute)
app.use('/api/company',  jobPostingRoute)
app.use('/api/company',   myJobsRoute )  
app.use('/api/company',   deleteJobRoute)
app.use('/api/candidate', getAllJobsRoutes)
app.use('/api/candidate', getJobByIDRoute)
app.use('/api/candidate', registerCandidateRoute)
app.use('/api/candidate', loginCandidateRoute)
app.use('/api/candidate', updateDataRoute)
app.use('/api/candidate', getProfileDataRoute)
app.use('/api/candidate', saveJobsRoutes)
app.use('/api/candidate', deleteJobRoute)
app.use('/api/candidate', GetAllSavedJobsRoute)
app.use('/api/candidate', getSimilarJobRoute)
app.use('/api/candidate', AppliedJobRoute)
app.use('/api/candidate',getOtp)
app.use('/api/candidate/google',googleRouter)
app.use('/api/candidate/profile', updateResume)
app.use('/api/candidate/profile', AddEducationRouter)




const port= process.env.PORT  



app.listen(port, ()=>{console.log(`server is listening in port ${port}`)})