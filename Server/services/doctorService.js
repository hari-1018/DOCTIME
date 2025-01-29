const Doctor = require("../models/doctorModel");

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
        throw new Error("Doctor not found");
    }

    return {
        message: "Doctor fetched successfully",
        doctor,
    };
};


module.exports = { FetchDoctors, FetchDoctorById };