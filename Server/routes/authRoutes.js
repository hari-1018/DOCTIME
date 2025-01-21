const express = require('express');
const authRouter = express.Router();
const {register, login, googleAuth} = require('../controllers/authController');

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/reg', googleAuth);

module.exports = authRouter;