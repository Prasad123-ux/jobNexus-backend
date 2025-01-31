const { SavedJob } = require("../../Modules/Candidate/SaveJob");

const GetAllSavedJobsController = async (req, res) => {
  try {
    // Use async/await for proper handling of asynchronous operations
    const allSavedJobs = await SavedJob.find({ UserEmail: req.email });

    // Check if no saved jobs are found
    if (!allSavedJobs || allSavedJobs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No saved jobs found for this user.",
      });
    }

    // Return the saved jobs if found
    return res.status(200).json({
      success: true,
      message: "Data accessed successfully.",
      data: allSavedJobs,
    });
  } catch (err) {
    console.error(err.message);

    // Handle any server errors
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: err.message,
    });
  }
};

module.exports = { GetAllSavedJobsController };
