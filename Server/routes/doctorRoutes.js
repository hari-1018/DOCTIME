const express = require('express');
const doctorRouter = express.Router();
const { fetchDoctors, fetchDoctorById, changeAppointmentStatus, doctorForgotPassword} = require("../controllers/doctorController");

doctorRouter.get('/', fetchDoctors);
doctorRouter.get('/:id', fetchDoctorById);
doctorRouter.put('/:appointmentId/change-status', changeAppointmentStatus);
doctorRouter.post('/forgot-password', doctorForgotPassword);

module.exports = doctorRouter;