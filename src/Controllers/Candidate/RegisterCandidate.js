const { JobSeekerDetail } = require("../../Modules/Candidate/JobSeekers")
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')
const env= require('dotenv')
const { validationResult } = require("express-validator")
env.config()


const RegisterCandidateController=(req, res)=>{
    // console.log(req.body.projects[0].title)
    console.log(req.body)
const userData= req.body.userData
console.log(userData.password)
const error= validationResult(req)

if(!error.isEmpty()){
   return   res.status(400).json({success:false, message:"validation error", error:error.errors[0].msg})
}else{
   

    JobSeekerDetail.findOne({Email:userData.email}).exec()
    .then((user)=>{
        //  console.log(user)     
        if(user!==null){

           return  res.status(400).json({success:false, message:"user already found"})
        }else{
            

        
            const salt=10
            bcrypt.hash(userData.password, salt,(err, result)=>{
                if(err){
                    return  res.status(400).json({success:false, message:"ohh1 there is some error", error:err.message})
                }else if(result){
                    userData.password= result 
                    // console.log(req.body.password)


                    const candidateObject=new JobSeekerDetail({
                    FullName:userData.fullName,
                    Email:userData.email,
                    Password:userData.password,
                    WorkStatus:userData.workStatus,
                    City:userData.city,
                    MobileNumber:userData.mobileNumber
                    //    FullName : req.body.fullName ||"",
                    //     DateOfBirth:req.body.dateOfBirth ||"",
                    //     Gender:req.body.gender || "",
                    //     Email:req.body.email || "",
                    //     Password:req.body.password ||"",
                    //     MobileNumber:req.body.mobileNumber ||"",
                    //     Address:req.body.address ||"" ,
                    //     Education:req.body.education.map(edu=>({
                    //          Degree:edu.degree,
                    //          Major:edu.Major,
                    //          University:edu.university,
                    //          GraduationYear:edu.graduationYear,
                    //          GPA:edu.gpa


                    //     })) ||"",
                    //     WorkExperience:req.body.workExperience.map(work=>({
                    //         JobTitle: work.jobTitle,
                    //         CompanyName: work.companyName,
                    //         Duration: work.duration,
                    //         JobDescription: work.jobDescription
                    //     })) ||"",
                    //    Skills:req.body.skills.map(skills=>({skills:skills.skills})),
                    //    Projects:req.body.projects.map(project=>({
                    //  Title:project.title,
                    //  Date:project.date,
                    //  Description:project.description
                    //    })) ||"",
                    //    Achievements:req.body.achievements.map(achievement=>({
                    //  Title:achievement.title,
                    //  Date:achievement.date,
                    //  Organization:achievement.organization,
                    //  description:achievement.description
                   

                    //    })) ||"",
                       
                    //    Summary:req.body.summary,
                    //    Activities:req.body.activities.map(activity=>({
                    //     Title:activity.title,
                    //     Description:activity.description,
                    //     Position:activity.position
                    //    })) ||"",
                       
                       
                     
                    //    Language: req.body.languages.map(language=>({
                    //           Language:language.language,
                    //           Proficiency:language.proficiency

                    //    })) ||""
                    //   ,
                    //    Reference:req.body.references.map(reference=>({
                    //      Name:reference.name,
                    //      Relationship:reference.relationship,
                    //      contact:reference.contact
                    //    })) ||""
                       
                    //    ,
                    //    Certification:req.body.certification.map(certification=>({
                    //     Name:certification.name,
                    //     Date:certification.date
                    //    })) 
                       
                      
                       
                        })
                       
                        candidateObject.save().then((user)=>{
                            //  console.log(user)
                            const token= jwt.sign({email:user.Email, role:user.role},process.env.JWT_TOKEN, {"expiresIn":"30d"})
                            res.status(200).json({success:true, message:"Data saved", token:token})
                        }).catch((err)=>{
                          return   res.status(404).json({success:true, message:"Problem with data saving" , error:err})

                        })


                }else{
                   return   res.status(404).json({success:false, message:"there is some problem "})
                }

            } )
        

        }

    })
}
}

module.exports={RegisterCandidateController}