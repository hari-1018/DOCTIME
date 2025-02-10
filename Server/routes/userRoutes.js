const express = require('express');
const userRouter = express.Router();

const { userDetailsController, editUserController } = require("../controllers/userController");

userRouter.get('/:id', userDetailsController);
userRouter.put('/edit-user/:id', editUserController);


module.exports = userRouter;