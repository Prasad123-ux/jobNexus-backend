import { JobSeekerDetail } from "../../Modules/Candidate/JobSeekers"

const updateCandidateData= async(req,res)=>{
   const candidateID= req.params.id

try{
    const candidate=  await JobSeekerDetail.findByIdAndUpdate(candidateID) 
    if(!candidate){
        return res.status(404).json({success:true, message:"Data Not Found"})
    }else{

        if(req.body.firstName) candidate.FirstName= req.body.FirstName;
        if(req.body.lastName) candidate.LastName= req.body.LastName;
        if(req.body.dateOfBirth) candidate.DateOfBirth= req.body.dateOfBirth;
        if(req.body.gender) candidate.Gender= req.body.gender;
        if(req.body.address) candidate.Address= req.body.address;
        if(req.body.summary) candidate.Summary= req.body.Summary;  
        if(req.body.mobileNumber) candidate.MobileNumber= req.body.MobileNumber;
        if(req.body.education){
            req.body.education.forEach((edu, index)=>{
                if(candidate.Education || candidate.Education[index]){
                    if(edu.degree) candidate.Education[index].Degree= edu.degree;
                    if(edu.institute) candidate.Education[index].Institute= edu.institute;
                    if(edu.date) candidate.Education[index].Date= edu.date;

                }else{
                    candidate.Education.push(edu)
                }
                 })
      }
      
if(req.body.workExperience){
    req.body.workExperience.forEach((work, index)=>{
        if(candidate.WorkExperience  || candidate.WorkExperience[index])  {
            if(work.jobTitle) candidate.WorkExperience[index].JobTitle=work.jobTitle ;
            if(work.companyName) candidate.WorkExperience[index].CompanyName= work.companyName;
            if(work.duration) candidate.WorkExperience[index].Duration= work.duration;
            if(work.description) candidate.WorkExperience[index].JobDescription= work.description;

        }else{
            candidate.WorkExperience.push(work)
        }

    })
}
if(req.body.skills){
    req.body.skills.forEach((skill)=>{
        candidate.Skills.push(skill)

    })
}
if(req.body.projects) {
    req.body.projects.forEach((project, index)=>{
        if(candidate.Projects || candidate.Projects[index] ){
            if(project.title) candidate.Projects[index].Title=project.title;
            if(project.date) candidate.Projects[index].Date= project.title;
            if(project.description) candidate.Projects[index]=project.description;
        }else{
            candidate.Projects.push(project)
        }

    })

}
if(req.body.achievements){
    req.body.achievements.forEach((ach, index)=>{
        if(candidate.Achievements || candidate.Achievements[index]){ 
            if(ach.title) candidate.Achievements[index].Title=ach.title;
            if(ach.organization) candidate.Achievements[index].Organization= ach.organization;
            if(ach.date) candidate.Achievements[index].Date= ach.date
            if(ach.description) candidate.Achievements[index].Description= ach.Achievements 


        }else{
            candidate.Achievements.push(ach)
        }
    })
}
if(req.body.activities){
   req.body.activities.forEach((activity, index)=>{
  if(candidate.Activities || candidate.Activities[index]){
    if(activity.title) candidate.Activities[index].Title= activity.title;
    if(activity.description) candidate.Activities[index].Description= activity.description;
    if(activity.position) candidate.Activities[index].Position= activity.Position;
  }
  else{
    candidate.Activities.push(activity)
  }
   })
}


if(req.body.language){
    req.body.language.forEach((lang , index)=>{
        if(candidate.Language || candidate.Language[index]){
            if(lang.language) candidate.Language[index].Language= lang.language;
            if(lang.proficiency) candidate.Language[index].Proficiency= lang.proficiency
        }else{
    candidate.Language.push(lang)
        }

    })
}

if(req.body.Certification){
    req.body.certification.forEach((cert, index)=>{
        if(candidate.Certification || candidate.Certification[index])  {

        
            if(cert.name) candidate.Certification[index].Name= cert.name;
            if(cert.date) candidate.Certification[index].Date= cert.date;
        }else{
            candidate.Certification.push(cert)
        }

    })
}

if(req.body.reference){
    req.body.reference.forEach((refer , index)=>{
        if(candidate.Reference || candidate.Reference[index] ){
            if(refer.name) candidate.Reference[index].Name=refer.name
            if(refer.relationship) candidate.Reference[index].Relationship= refer.relationship
        }else{
            candidate.Reference.push(refer)
        }

    });

}
await candidate.save();
res.status(200).json({success:true, message:"Data Saved SuccessFully"})
    }


}
catch (err){
    res.status(404).json({success:false, message:"Data Not Updated", })

}

}

module.exports={updateCandidateData}