const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authentication');
const userController = require("../controllers/user-controller");

// Sign Up
router.post('/signup', userController.userRegister);

// Login
router.post('/login', userController.userLogin);

// User Logout
router.get("/logout", userController.userLogout);

// Secure user data
router.get('/', authenticateUser, userController.userActionController);

module.exports = router;
