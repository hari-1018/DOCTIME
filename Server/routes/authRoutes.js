const express = require('express');
const authRouter = express.Router();
const {register, login, doctorLogin, adminLogin, googleAuth } = require('../controllers/authController');

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/google', googleAuth);
authRouter.post('/doctor-login', doctorLogin);
authRouter.post('/admin-login', adminLogin);



module.exports = authRouter;