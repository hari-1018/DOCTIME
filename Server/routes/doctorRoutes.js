const express = require('express');
const doctorRouter = express.Router();
const { fetchDoctors, fetchDoctorById, changeAppointmentStatus} = require("../controllers/doctorController");

doctorRouter.get('/', fetchDoctors);
doctorRouter.get('/:id', fetchDoctorById);
doctorRouter.put('/:appointmentId/change-status', changeAppointmentStatus);

module.exports = doctorRouter;