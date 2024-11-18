 const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { JobSeekerDetail } = require('../../Modules/Candidate/JobSeekers');

 



    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    }); 


    const storage= multer.diskStorage({
        destination:(req, file, cb)=>{ 
            cb(null, './src/upload') ; 


        },
        filename:(req, file, cb)=>{ 
            const uniqueSuffix = Date.now() + "_" + Math.floor(Math.random() * 1000 + 1);   
        cb(null, uniqueSuffix + path.extname(file.originalname)); 

        }
    }) 
    const upload =multer({storage:storage}).single('image')  


    const uploadProfileImageController=(req, res)=>{    
        const email= req.email 
        console.log(email) 
        
     
       

        upload(req,res, async(err)=>{
            if(err){
                return res.status(404).json({success:false, message:"file not upload", error:err.message})
            } 
            if(!req.file){
                return res.status(400).json({ success: false, message: 'No file uploaded' });
            } 


            const filePath = req.file.path  

            try {

             

                const result = await cloudinary.uploader.upload(filePath, {
                    public_id: `profile_images/${path.basename(filePath, path.extname(filePath))}`, // Save under profile_images folder
                    folder: 'profile_images', // Optional: Ensures all profile images are stored under this folder
                });
            
        
                // Upload to Cloudinary
              
                // Upload to Cloudinary
             
    
                // Remove local file after upload to Cloudinary
                fs.unlinkSync(filePath);
    
                // Update JobSeeker resume URL in the database
                JobSeekerDetail.findOneAndUpdate(
                    { Email: email },
                    { $set: { 'extraFields.profileImage': result.secure_url } },
                    { new: true, upsert: true }
                )
                .then((user) => {
                    if (!user) {
                        return res.status(404).json({ success: false, message: 'User not found' });
                    }
                    res.status(200).json({ success: true, message: 'Profile image updated successfully', resumeUrl: result.secure_url });
                })
                .catch(err => {
                    console.error(err);
                    return res.status(500).json({ success: false, message: 'Error updating Profile Image' });
                });
            } catch (error) {
                return res.status(500).json({ success: false, message: 'Error uploading Profile Image to Cloudinary', error:error.message });
            }
        })   






    }
     








    module.exports={uploadProfileImageController}