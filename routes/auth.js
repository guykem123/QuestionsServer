const express = require('express');
const registrationController = require('../controllers/authController');
const md_auth = require("../middlewares/authenticated");
const api = express.Router();

api.post("/register", registrationController.register);
api.post("/login", registrationController.login);
api.post("/change-password", md_auth.ensureAuth, registrationController.changePassword);

module.exports = api;


