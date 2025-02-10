const asyncErrorResolver = require("../utils/asyncErrorResolver");
const { FetchDoctors, FetchDoctorById, ChangeAppointmentStatus, DoctorForgotPassword, DoctorResetPassword } = require("../services/doctorService")

//Fetch Doctors
const fetchDoctors = asyncErrorResolver(async (req, res) => {
    const result = await FetchDoctors();
    console.log("get all doctors", result);
    res.status(200).json({ status: "success", result });
});

//Fetch Doctor By ID
const fetchDoctorById = asyncErrorResolver(async (req, res) => {
    const result = await FetchDoctorById(req.params.id);
    if (!result) return res.status(404).json({ status: "error", message: "Doctor not found" });
    console.log("get doctor by id", result);
    res.status(200).json({ status: "success", result });
});

//Changing the status of appointment
const changeAppointmentStatus = asyncErrorResolver(async (req, res) => {
    const { appointmentId } = req.params;
    console.log("check appo id", appointmentId)

    if (!appointmentId) return res.status(400).json({ status: "error", message: "Invalid request" });
    const updatedAppointment = await ChangeAppointmentStatus(appointmentId);
    console.log("change appointment status", updatedAppointment);
    if (!updatedAppointment) {
        return res.status(404).json({ status: "error", message: "Appointment not found" });
    }
    res.status(200).json({ status: "success", message: 'Appointment marked as completed successfully', data: updatedAppointment });
});

//Forgot Password
const doctorForgotPassword = asyncErrorResolver(async (req, res) =>{
    console.log("forgot password", req.body);
    const data =  await DoctorForgotPassword(req.body);
    // console.log("data",data)
    res.status(200).json({ status: "success", data: data})
  })

//Reset Password
const doctorResetPassword = asyncErrorResolver(async (req,res) =>{
    const data =  await DoctorResetPassword(req.body, req.params);
    res.status(200).json({ status: "success", data: data})
  
})



module.exports = { fetchDoctors, fetchDoctorById, changeAppointmentStatus, doctorForgotPassword, doctorResetPassword };