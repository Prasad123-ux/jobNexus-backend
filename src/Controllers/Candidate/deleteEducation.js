const { JobSeekerDetail } = require("../../Modules/Candidate/JobSeekers");

const deleteEducationDataController = async (req, res) => {
  const id = req.query.id;
  const index = parseInt(req.query.index);  // Ensure index is treated as an integer
  console.log(id, index); 
  const dataType= req.query.dataType
  

  try {
    const updateUser = await JobSeekerDetail.findById(id);

    if (!updateUser) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // Unset the specific index in the Education array
    const unsetField = await JobSeekerDetail.updateOne(
      { _id: id },
      { $unset: { [`extraFields.${dataType}.${index}`]: 1 } }
    );

    // Remove the `null` value from the array using $pull
    const deletedUser = await JobSeekerDetail.updateOne(
      { _id: id },
      { $pull:  ({[`extraFields.${dataType}`]:null}) }
    );

    // Check if the Education array is now empty
    const updatedUserAfterDeletion = await JobSeekerDetail.findById(id);
    // const checkLength =  updatedUserAfterDeletion?.extraFields?.dataType.length === 0;

    // if empty array then remove all array   
    const updatedArray = updatedUserAfterDeletion?.extraFields?.[dataType];


     if (!updatedArray || updatedArray.length === 0) {
       await JobSeekerDetail.updateOne({ _id: id }, { $unset: { [`extraFields.${dataType}`]: 1 } });
     }
    
    if (deletedUser.modifiedCount > 0) { 
      return res.status(200).json({ success: true, message: "Data Deleted Successfully" });
    } else {
      return res.status(400).json({ success: false, message: "Data Not Deleted" });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: "Internal server error" , error:err.message });
  }
};

module.exports = { deleteEducationDataController };
