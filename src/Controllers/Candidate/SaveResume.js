const cloudinary = require('cloudinary').v2;
const multer = require('multer');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { JobSeekerDetail } = require('../../Modules/Candidate/JobSeekers');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Absolute path to the existing 'upload' folder in 'src' directory
const uploadDir = path.join(__dirname, '..', '..', 'upload'); // Adjust the path to your specific structure

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Use absolute path for the upload directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "_" + Math.floor(Math.random() * 1000 + 1);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).single('resume');

const saveResumeController = (req, res) => {
    const email = req.email;
    console.log(email)
    console.log(req.body.resume)
    // Handle file upload using multer
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }

        let filePath;
        if (req.file) {
            filePath = req.file.path;
          
        } else if (req.body.resume) {
            // If resume is in req.body as base64 or other format, handle it properly
            const resumeBuffer = Buffer.from(req.body.resume, 'base64'); // Adjust if the format is different
            filePath = path.join(uploadDir, Date.now() + '_resume');

            try {
                fs.writeFileSync(filePath, resumeBuffer); // Write the file to disk
            } catch (error) {
                return res.status(500).json({ success: false, message: 'Failed to save file!', error: error.message });
            }
        } else {
            return res.status(400).json({ success: false, message: 'No file uploaded! Please try again.' });
        }

        try {
            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(filePath, {
                resource_type: 'raw',
                public_id:`resumes/${path.basename(filePath)}`
            });

            // Remove local file after uploading to Cloudinary
            fs.unlinkSync(filePath);

            // Update the JobSeeker's resume URL in the database
            JobSeekerDetail.findOneAndUpdate(
                { Email: email },
                { $set: { 'extraFields.resume': result.secure_url } },
                { new: true, upsert: true }
            )
            .then((user) => {
                console.log(user)
                if (!user) {
                    return res.status(403).json({ success: false, message: 'User Not Found' });
                } else {
                    return res.status(200).json({ success: true, message: 'Resume Updated Successfully' });
                }
            })
            .catch((err) => {
                if(filePath && fs.existsSync(filePath)){
                    fs.unlinkSync(filePath)
                }
                return res.status(500).json({ success: false, message: 'Internal Server Error' , err:err });
            });

        } catch (err) {
            return res.status(500).json({ success: false, message: 'Resume Not Uploaded! Please Try Again', error: err });
        }
    });
};

module.exports = { saveResumeController };
