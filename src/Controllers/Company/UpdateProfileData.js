// const { CompanyRegister } = require("../../Modules/HR/Registration")

const { CompanyRegister } = require("../../Modules/HR/Registration")

const updateProfileController=(req, res)=>{

    CompanyRegister.findOneAndUpdate({CompanyEmail:req.body.email}, {
        CompanyName:req.body.companyName,
    CompanyAddress:req.bod.companyAddress,
    CompanyWebsite:req.body.companyWebsite,
    CompanyMobile:req.body.companyMobile,
    CompanyLogo:req.body.companyLogo,
    CompanyDescription:req.body.companyLogo,
    CompanyIndustry:req.body.companyLogo,
    CompanySize:req.body.companySize,
    CompanyEstablishmentYear:req.body.companyEstablishmentYear,
    CompanyRegistrationNumber:req.body.companyRegisterNumber,
    CompanyTIN:req.body.companyTIN,
    CompanyBLN:req.body.companyBLN,
    CompanyLinkedinProfile:req.body.companyLinkedinProfile,
    CompanyTwitterProfile:req.body.companyTwitterProfile,
    CompanyFacebookProfile:req.body.companyFacebookProfile,
    CompanyOtherProfile:req.body.companyOtherProfile,
    

    }, {new:true}).then((user)=>{
        if(user!==null){
            res.status(200).json({success:true, message:"Data Updated"})
        }else{
            res.status(404).json({success:false, message:"Data not updated"})
        }

    }).catch((err)=>{
        res.status(404).json({success:false, message:"Data not Update", error:err})

    })
    

    
}

module.exports={updateProfileController}