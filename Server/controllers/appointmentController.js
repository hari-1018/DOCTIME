const asyncErrorResolver = require("../utils/asyncErrorResolver");
const { BookAppointment } = require("../services/appointmentService");

//Book Appointment
const bookAppointment = asyncErrorResolver(async (req, res) => {
    const { patientId, doctorId, slotDate, slotTime } = req.body;
    const result = await BookAppointment({ patientId, doctorId, slotDate, slotTime });
    res.status(200).json({status: "success", message: "Appointment booked successfully", result });
});

module.exports = { bookAppointment };