// routes/auth.js

const express = require('express');
const { googleSignIn } = require('../../Controllers/Candidate/getMailApiToken');
const googleRouter = express.Router();
// const { googleSignIn } = require('../controllers/authController');

// POST /api/auth/google
googleRouter.post('/google', googleSignIn);

module.exports = {googleRouter};
