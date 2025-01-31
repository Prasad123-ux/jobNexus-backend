const { AppliedJobData } = require("../../Modules/Candidate/AppliedJob");

const handleArchiveController = async (req, res) => {
  try {
    const { id } = req.params; // Extract job ID from params
    const userEmail = req.email; // Get user email (assumed to be set by middleware)

    console.log("Job ID:", id);
    console.log("User Email:", userEmail);

    // Find and delete the job by _id and UserEmail
    const job = await AppliedJobData.findOneAndDelete({ _id:id, UserEmail: userEmail }); 
    console.log(job)

    if (!job) {
      return res.status(404).json({ status: false, message: "Job not found" });
    }

    // Successful deletion
    return res.status(200).json({ status: true, message: "Job data deleted successfully" });
  } catch (err) {
    console.error("Error in handleArchiveController:", err.message);

    // Internal server error response
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

module.exports = { handleArchiveController };
