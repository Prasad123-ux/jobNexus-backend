const { JobSeekerDetail } = require('../../Modules/Candidate/JobSeekers');

const updateCandidateData = async (req, res) => {
  const candidateID = req.body.id;
  const { dataCategory, index, data } = req.body; // Dynamic   
  
  console.log(dataCategory)
  console.log(index)
  console.log(data)
  console.log(candidateID)

  try {
    // Prepare the update object
    const updateObject = {};

    // Handle basic field updates
    if (req.body.firstName) updateObject.FirstName = req.body.firstName;
    if (req.body.lastName) updateObject.LastName = req.body.lastName;
    if (req.body.dateOfBirth) updateObject.DateOfBirth = req.body.dateOfBirth;
    if (req.body.gender) updateObject.Gender = req.body.gender;
    if (req.body.address) updateObject.Address = req.body.address;
    if (req.body.summary) updateObject.Summary = req.body.summary;
    if (req.body.mobileNumber) updateObject.MobileNumber = req.body.mobileNumber;  

    // Handle dynamic fields update (e.g., extraFields like Education or WorkExperience)
    if (dataCategory && index !== undefined && data) {
      // Construct the path to update the specific index in extraFields
      const categoryPath = `extraFields.${dataCategory}.${index}`;
      updateObject[categoryPath] = data; // e.g., { "extraFields.Education.0": data }
    }

    // Execute the update operation
    const result = await JobSeekerDetail.updateOne(
      { _id: candidateID },
      { $set: updateObject }
    );

    // Check if the update was successful
    if (result.modifiedCount > 0) {
      res.status(200).json({ success: true, message: "Data updated successfully" });
    } else {
      res.status(404).json({ success: false, message: "Candidate not found or no changes made" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
  }
};

module.exports = { updateCandidateData };
