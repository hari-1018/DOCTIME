const express = require('express');
const appointmentRouter = express.Router();
const { bookAppointment, userViewAppointments, getAppointmentDetails, doctorViewAppointments, createPayment, verifyPayment } = require("../controllers/appointmentController");

appointmentRouter.post('/book-appointment', bookAppointment);
appointmentRouter.get('/:id', userViewAppointments);
appointmentRouter.get('/doctor/:id', doctorViewAppointments);
appointmentRouter.get('/details/:appointmentId', getAppointmentDetails);
appointmentRouter.post('/create-payment', createPayment);
appointmentRouter.post('/verify-payment', verifyPayment);

module.exports = appointmentRouter;
