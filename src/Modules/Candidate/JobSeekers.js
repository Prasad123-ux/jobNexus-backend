const { mongoose } = require("../../Config/db");




const jobSeekerSchema= new mongoose.Schema({


FullName:{
    type:String,
    required:true
},
Email:{
    type:String,
    required:true,

},
Password:{
type:String,
required:true
},
City:String,
MobileNumber:Number,
WorkStatus:String,


extraFields:{
    type:mongoose.Schema.Types.Mixed ,
    default:{}
}

,


// FullName:{
//     type:String,
//     required:true
// },

// DateOfBirth:{
//     type:String,
//     required:true
// },
// Gender:{
//     type:String,
//     required:true
// },
// Email:{
//     type:String,
//     required:true
// },
// Password:{
//     type:String,
//     required:true
// },
// MobileNumber:{
//     type:String,
//     required:true

// },
// Address:{
//     type:String,
//     required:true
// },

// Education:[
//     {
//         Degree:String,
//         Major:String,
//         University:String,
//         GraduationYear:Number,
//         Gpa:Number,

//     },

// ],
// WorkExperience:[
//     {
//         JobTitle:String,
//         CompanyName:String,
//         Duration:String,
//         JobDescription:String,
//     }
// ],
// Skills:[{
//     Skills:String
// }],
// Projects:[
//     {
//         Title:String,
//         Description:String,
//         Technologies:String
//     }
// ],
// Achievements:[
//     {
//         Title:String,
//         Organization:String,
//         Date:Date,
//         Description:String,
//     }
// ]
// ,
// Summary:String,
// Activities:[
//     {
//         ActivityName:String,
//         Description:String,
//         Duration:String,
//         Position:String
//     }
// ],
// Language:[
//     {
//         Language:String,
//         Proficiency:String,
//     }
// ],
// Reference:[
//     {
//         Name:String,
//         Relationship:String,
//         Contact:String
//     }
// ],
// Certification:[
//     {
//         Name:String,
//         Date:String
//     }
// ]
// ,
role:{
    type:String,
        enum:['candidate', 'company', 'Admin'],
        default:'candidate'
}


}, {timestamps:true}, {strict:false})

const JobSeekerDetail=mongoose.model('JobSeekerDetail', jobSeekerSchema)




module.exports={JobSeekerDetail}