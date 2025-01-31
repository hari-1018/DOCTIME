const asyncErrorResolver = require("../utils/asyncErrorResolver");
const { BookAppointment, UserViewAppointments } = require("../services/appointmentService");

//Book Appointment
const bookAppointment = asyncErrorResolver(async (req, res) => {
    const { patientId, doctorId, slotDate, slotTime } = req.body;
    const result = await BookAppointment({ patientId, doctorId, slotDate, slotTime });
    console.log("book appointment", result);
    res.status(200).json({status: "success", message: "Appointment booked successfully", result });
});

//User view their appointments 
const userViewAppointments = asyncErrorResolver(async (req, res) => {
    const userId = req.params.id;
    if (!userId) return res.status(400).json({ status: "error", message: "Invalid user ID" });
    console.log("user view appointments", userId);
    const appointments = await UserViewAppointments(userId);
    console.log("view appointments", appointments);
    res.status(200).json({ status: "success", appointments });
});


module.exports = { bookAppointment, userViewAppointments };