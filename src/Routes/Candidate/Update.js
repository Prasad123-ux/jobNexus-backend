const express= require('express');
const { updateProfileController } = require('../../Controllers/Company/UpdateProfileData');
const updateDataRoute= express.Router();


updateDataRoute.post('/update_candidate', updateProfileController)


module.exports={updateDataRoute}