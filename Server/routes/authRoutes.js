const express = require('express');
const authRouter = express.Router();
const {register, login, doctorLogin, googleAuth } = require('../controllers/authController');

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/google', googleAuth);
authRouter.post('/doctor-login', doctorLogin);


module.exports = authRouter;