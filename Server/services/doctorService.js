const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");
const CustomError = require("../utils/customError");

//Fetch all doctors
const FetchDoctors = async () => {
    const doctors = await Doctor.find(); 
    return {
        message: "All doctors fetched successfully",
        doctors,
    };
};

//Fetch doctor by id
const FetchDoctorById = async (doctorId) => {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
        throw new CustomError("Doctor not found");
    }

    return {
        message: "Doctor fetched successfully",
        doctor,
    };
};

//Changing Appointment Status
const ChangeAppointmentStatus = async (appointmentId) => {
    const appointment = await Appointment.findByIdAndUpdate(
        appointmentId, {isCompleted : true}, { new: true }
    );
    if (!appointment) {
        throw new CustomError("Appointment not found", 404);
    }

    return {
        appointment,
    };
};

module.exports = { FetchDoctors, FetchDoctorById, ChangeAppointmentStatus};