// controllers/authController.js

const { OAuth2Client } = require('google-auth-library');
// const User = require('../models/User');
const googleData = require('../../Modules/Candidate/getMailApi');

const client = new OAuth2Client('940799872663-6cu5gsjqgi5iji4m17el67hm170tm86e.apps.googleusercontent.com');

const googleSignIn = async (req, res) => {
    const { token } = req.body;

    try {
        // Verify Google token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: '940799872663-6cu5gsjqgi5iji4m17el67hm170tm86e.apps.googleusercontent.com'
        });

        const payload = ticket.getPayload();
        const googleId = payload['sub'];
        const email = payload.email;
        const name = payload.name;
        const picture = payload.picture;

        // Check if the user exists in the database
        let user = await googleData.findOne({ googleId });

        if (!user) {
            // Create a new user if not exists
            user = new User({
                googleId,
                email,
                name,
                picture
            });
            await user.save();
        }

        // Respond with user information or token as needed
        res.status(200).json({ message: "User authenticated", user });

    } catch (error) {
        res.status(401).json({ message: "Invalid token", error });
    }
};


module.exports={googleSignIn}