const express = require('express');
const userRouter = express.Router();

const { userDetailsController, editUserController, totalAppointmentsController } = require("../controllers/userController");

userRouter.get('/:id', userDetailsController);
userRouter.put('/edit-user/:id', editUserController);
userRouter.get('/total-appointments/:userId', totalAppointmentsController);


module.exports = userRouter;