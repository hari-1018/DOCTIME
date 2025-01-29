const express = require('express');
const authRouter = express.Router();
const {register, login, googleAuth, fetchDoctors, bookAppointment} = require('../controllers/authController');

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/google', googleAuth);
authRouter.get('/doctors', fetchDoctors);
authRouter.post('/book-appointment', bookAppointment);


module.exports = authRouter;