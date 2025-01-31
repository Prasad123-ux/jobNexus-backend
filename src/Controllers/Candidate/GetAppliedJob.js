const { AppliedJobData } = require("../../Modules/Candidate/AppliedJob");

const getAppliedJobController = async (req, res) => {
  const email = req.email;
 console.log(email)
  try {
    // Find jobs based on the user's email
    const data = await AppliedJobData.find({ UserEmail: email });

    // Check if data exists
    if (!data || data.length === 0) {
      return res
        .status(404)
        .json({ status: false, message: "No jobs found for the given email." });
    }

    // Respond with the found data
    return res.status(200).json({
      status: true,
      message: "Jobs found successfully.",
      data: data,
    });
  } catch (err) {
    // Log the error for debugging
    console.error("Error fetching applied jobs:", err);

    // Respond with an internal server error message
    return res.status(500).json({
      status: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

module.exports = { getAppliedJobController };
   


