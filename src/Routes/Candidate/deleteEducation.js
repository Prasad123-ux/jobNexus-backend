const express = require('express')
const { deleteEducationDataController } = require('../../Controllers/Candidate/deleteEducation')
const deleteEducationRoute= express.Router()


deleteEducationRoute.delete('/deleteEducation', deleteEducationDataController) 


module.exports={deleteEducationRoute}