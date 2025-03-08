const express = require('express');
const userRouter = express.Router();
const {upload} = require('../middlewares/fileUploader')

const {
    profilePictureController,
    userDetailsController, 
    editUserController, 
    totalAppointmentsController 
} = require("../controllers/userController");

userRouter.post('/upload-profile', upload.single('image'), profilePictureController)
userRouter.get('/:id', userDetailsController);
userRouter.put('/edit-user/:id', editUserController);
userRouter.get('/total-appointments/:userId', totalAppointmentsController);


module.exports = userRouter;