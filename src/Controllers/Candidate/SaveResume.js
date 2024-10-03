const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { JobSeekerDetail } = require('../../Modules/Candidate/JobSeekers');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload');  // Folder to temporarily store uploads
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "_" + Math.floor(Math.random() * 1000 + 1);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});



const upload = multer({ storage: storage }).single('resume');

// Controller to save the resume
const saveResumeController = (req, res) => {
    const email = req.email;
console.log(req.body)
    // Handle file upload using multer
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        if (!req.file) {
            console.error('No file uploaded');
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }
    
        const filePath = req.file.path;
        console.log(filePath)

        try {
            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(filePath, {
                resource_type: 'raw',  // 'raw' for non-image files like PDF
                public_id: `resumes/${path.basename(filePath)}`,
            });

            // Remove local file after upload to Cloudinary
            fs.unlinkSync(filePath);

            // Update JobSeeker resume URL in the database
            JobSeekerDetail.findOneAndUpdate(
                { Email: email },
                { $set: { 'extraFields.resume': result.secure_url } },
                { new: true, upsert: true }
            )
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ success: false, message: 'User not found' });
                }
                res.status(200).json({ success: true, message: 'Resume updated successfully', resumeUrl: result.secure_url });
            })
            .catch(err => {
                console.error(err);
                return res.status(500).json({ success: false, message: 'Error updating resume' });
            });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Error uploading resume to Cloudinary', error });
        }
    });
};

module.exports = { saveResumeController };
