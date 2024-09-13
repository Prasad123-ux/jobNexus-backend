const crypto = require('crypto');
const { OTP } = require('../../Modules/Candidate/OtpData');
const { JobSeekerDetail } = require('../../Modules/Candidate/JobSeekers');
const nodeMailer = require('nodemailer');
const env = require('dotenv');
env.config();

// Define sendEmail function to accept otp as a parameter 

const sendEmail = (to, subject, text, otp) => {
    const transporter = nodeMailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text: `${text}: ${otp}`, // Include OTP in the email body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
    });
};

const getForgetOtp = async (req, res) => {
    const  email  = req.body.otpEmailValue;
    console.log(process.env.EMAIL_USER)
    console.log(process.env.EMAIL_PASS)


    try {
        const user = await JobSeekerDetail.findOne({ Email: email }).exec();
        if (!user) {
            return res.status(400).json({ success: false, message: "Sorry! User not found" });
        }

        // Invalidate any previous OTPs
        await OTP.findOneAndDelete({ userEmail: email }).exec();

        // Generate a new OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpirationTime = Date.now() + 3600000; // 1 hour expiration

        // Save the new OTP to the database
        const otpObject = new OTP({
            userEmail: email,
            otp: otp,
            otpExpiration: otpExpirationTime,
        });
        await otpObject.save();

        // Send the OTP to the user's email
        sendEmail(email, "Your OTP Code", "Your OTP code is", otp);

        res.status(200).json({ success: true, message: "OTP sent successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: "An error occurred", error: err.message });
    }
};

module.exports = { getForgetOtp };
