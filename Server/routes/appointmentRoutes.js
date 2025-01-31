const express = require('express');
const appointmentRouter = express.Router();
const { bookAppointment, userViewAppointments } = require("../controllers/appointmentController");

appointmentRouter.post('/book-appointment', bookAppointment);
appointmentRouter.get('/:id', userViewAppointments);

module.exports = appointmentRouter;
