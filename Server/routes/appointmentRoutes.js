const express = require('express');
const appointmentRouter = express.Router();
const { bookAppointment, userViewAppointments, doctorViewAppointments } = require("../controllers/appointmentController");

appointmentRouter.post('/book-appointment', bookAppointment);
appointmentRouter.get('/:id', userViewAppointments);
appointmentRouter.get('/doctor/:id', doctorViewAppointments);

module.exports = appointmentRouter;
