const {CompanyRegister} = require("../../Modules/HR/Registration") 
const {JobSeekerDetail}= require("../../Modules/Candidate/JobSeekers")

const followCompanyController = async (req, res) => { 
    const { token, follows, id } = req.body;      
    const email = req.email;  // Assuming you've attached the user's email from the token verification middleware.

    try {
        // Find the user (Job Seeker)
        const user = await JobSeekerDetail.findOne({ Email: email }).exec();  // Use `findOne` for a single user
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Find the company by ID
        const company = await CompanyRegister.findById(id).exec();  // `findById` is more appropriate for finding by ID
        if (!company) {
            return res.status(404).json({ success: false, message: "Company not found" });
        }

        // Determine whether to follow or unfollow the company
        if (follows) {
            // Check if the user is already a follower to avoid duplicates
            const isAlreadyFollowing = company.CompanyFollowers&& company.CompanyFollowers.some(follower => follower.equals(user._id));
            if (!isAlreadyFollowing) {
                // Add the user's ID to the followers array (follow action)
                await CompanyRegister.findByIdAndUpdate(
                    id,
                    { $push: { CompanyFollowers: user._id } },
                    { new: true }
                );
                return res.status(200).json({ success: true, message: "Company followed successfully" });
            } else {
                return res.status(400).json({ success: false, message: "Already following this company" });
            }
        } else {
            // Unfollow action: remove the user's ID from the followers array
            await CompanyRegister.findByIdAndUpdate(
                id,
                { $pull: { CompanyFollowers: user._id } },
                { new: true }
            );
            return res.status(200).json({ success: true, message: "Company unfollowed successfully" });
        }
    } catch (err) {
        // Error handling
        return res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

module.exports= { followCompanyController };
