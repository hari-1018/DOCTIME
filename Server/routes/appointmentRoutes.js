const express = require('express');
const appointmentRouter = express.Router();
const { bookAppointment } = require("../controllers/appointmentController");

appointmentRouter.post('/book-appointment', bookAppointment);

module.exports = appointmentRouter;
