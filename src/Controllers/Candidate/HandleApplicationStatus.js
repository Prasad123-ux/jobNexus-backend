// import { JobDetail } from "../../Modules/HR/JobDetail";
 const { AppliedJobData } = require("../../Modules/Candidate/AppliedJob");
const {JobDetail}= require("../../Modules/HR/JobDetail")

const handleApplicationStatusController = async (req, res) => {
  try {
    // Extract parameters and body data
    const { id } = req.params; // Extract JobID from params
    const  status = req.body.Status; // Extract status from body
    const userEmail = req.email; // User email from middleware or token
 
    // Input validation
    if (!id || !status) {
      return res.status(400).json({ message: "Job ID and status are required." });
    }

    // Update job application status
    const updatedJob = await AppliedJobData.findOneAndUpdate(
      { _id:id, UserEmail: userEmail }, // Query to match job ID and user email
      { Status: status }, // Update to set new status
      { new: true } // Return the updated document
    );

    // Handle cases where no job is found
    if (!updatedJob) {
      return res.status(404).json({ message: "No matching job application found." });
    }

    // Respond with success
    res.status(200).json({
      message: "Application status updated successfully.",
      updatedJob,
    });
  } catch (error) {
    // Handle errors
    console.error("Error updating application status:", error);
    res.status(500).json({ message: "An error occurred.", error: error.message });
  }
};

module.exports={handleApplicationStatusController}

