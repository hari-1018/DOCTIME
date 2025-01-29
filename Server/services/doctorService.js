const Doctor = require("../models/doctorModel");

//Fetch all doctors
const FetchDoctors = async () => {
    const doctors = await Doctor.find(); 
    return {
        message: "All doctors fetched successfully",
        doctors,
    };
};


module.exports = { FetchDoctors };