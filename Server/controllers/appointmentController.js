const asyncErrorResolver = require("../utils/asyncErrorResolver");
const { BookAppointment, UserViewAppointments, DoctorViewAppointments } = require("../services/appointmentService");

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

//Doctor view their appointments 
const doctorViewAppointments = asyncErrorResolver(async (req, res) => {
    const doctorId = req.params.id;
    console.log('doctoId', doctorId)
    if (!doctorId) return res.status(400).json({ status: "error", message: "Invalid doctor ID" });
    console.log("user view appointments", doctorId);
    const appointments = await DoctorViewAppointments(doctorId);
    console.log("view appointments", appointments);
    res.status(200).json({ status: "success", message: "Doctor appointments fetched successfully", data: appointments });
});


module.exports = { bookAppointment, userViewAppointments, doctorViewAppointments };