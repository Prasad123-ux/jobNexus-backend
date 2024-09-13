
// const { mongoose }= require('C:/Users/metka/Desktop/jobNexus/react-backend/src/Config/db,js')
const {mongoose}= require('../../Config/db')

const CompanySchema= mongoose.Schema ({
    CompanyName:{
        type:String, 
        required:true
    },
    CompanyAddress:{
        type:String,
        required:true
    },
    CompanyWebsite:{
        type:String,
        required:false
    },
    CompanyEmail:{
        type:String,
        required:true
    },
    CompanyMobile:{
        type:Number,
        required:true

    },
    CompanyLogo:{
        type:String,
        required:false
    },
    CompanyDescription:{
        type:String,
        required:true
    },
    CompanyIndustry:{
        type:String,
        required:true
    },
    CompanySize:{
        type:String,
        required:true
    },
    CompanyEstablishmentYear:{
        type:Number,
        required:true


    },
    CompanyRegistrationNumber:{
        type:String,
        required:true,
    },
    CompanyTIN:{
        type:String,
        required:true

    },
    CompanyBLN:{
        type:String,
        required:false

    },
    CompanyLinkedinProfile:String,
    CompanyTwitterProfile:String,
    CompanyFacebookProfile:String,
    CompanyOtherProfile:String,
    CompanyPassword:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['candidate', 'company', 'Admin'],
        default:'company'
    }


}, {timestamps:true})

// const CompanyRegister=mongoose.model('CompanyRegister', CompanySchema)  
const CompanyRegister= mongoose.model('CompanyRegister', CompanySchema)


module.exports={CompanyRegister}