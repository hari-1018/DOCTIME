const express = require('express');
const doctorRouter = express.Router();
const { fetchDoctors, fetchDoctorById, changeAppointmentStatus, doctorForgotPassword, doctorResetPassword} = require("../controllers/doctorController");

doctorRouter.get('/', fetchDoctors);
doctorRouter.get('/:id', fetchDoctorById);
doctorRouter.put('/:appointmentId/change-status', changeAppointmentStatus);
doctorRouter.post('/forgot-password', doctorForgotPassword);
doctorRouter.post('/reset-password/:token', doctorResetPassword);

module.exports = doctorRouter;